'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {AvatarConfig,avatarDescription,avatarLayers,defaultAvatar,normalizeAvatar} from '../lib/avatar';
import artwork from '../lib/avatar-art.json';

const imageCache=new Map<string,Promise<HTMLImageElement>>();
function loadImage(src:string) {
  if(!imageCache.has(src)) imageCache.set(src,new Promise((resolve,reject)=>{
    const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{imageCache.delete(src);reject(new Error('Artwork could not be loaded.'));};img.src=src;
  }));
  return imageCache.get(src)!;
}

export async function drawAvatar(canvas:HTMLCanvasElement,config:AvatarConfig) {
  const layers=avatarLayers(config);
  const images=await Promise.all(layers.map(l=>loadImage(l.src)));
  // Draw to a separate canvas so slower previous requests cannot leave partial frames.
  const output=document.createElement('canvas');output.width=1024;output.height=1536;
  const ctx=output.getContext('2d');if(!ctx) throw new Error('Image preview is unavailable.');
  layers.forEach((layer,i)=>{
    const img=images[i];
    const bounds=artwork.assets.find(a=>a.url===layer.src)?.bounds||[0,0,img.naturalWidth,img.naturalHeight];
    const source=layer.id==='body'?[0,0,img.naturalWidth,img.naturalHeight]:layer.id==='head'?[0,0,img.naturalWidth,img.naturalHeight*570/1536]:bounds;
    if(!layer.tint){ctx.drawImage(img,source[0],source[1],source[2],source[3],...layer.rect);return;}
    // Separate garment mask; tint does not touch skin, hair or other clothing.
    const garment=document.createElement('canvas');garment.width=img.naturalWidth;garment.height=img.naturalHeight;
    const g=garment.getContext('2d')!;
    g.drawImage(img,0,0);g.globalCompositeOperation='multiply';g.fillStyle=layer.tint;
    g.fillRect(0,0,garment.width,garment.height);g.globalCompositeOperation='destination-in';g.drawImage(img,0,0);
    ctx.drawImage(garment,source[0],source[1],source[2],source[3],...layer.rect);
  });
  return output;
}

export function CustomAvatar({config,small=false,onReady}:{config:AvatarConfig;small?:boolean;onReady?:(ready:boolean)=>void}) {
  const ref=useRef<HTMLCanvasElement>(null);const [error,setError]=useState('');
  useEffect(()=>{let cancelled=false;onReady?.(false);setError('');
    drawAvatar(ref.current!,config).then(output=>{if(cancelled||!ref.current)return;const ctx=ref.current.getContext('2d')!;ctx.clearRect(0,0,1024,1536);ctx.drawImage(output,0,0);onReady?.(true);}).catch(()=>{if(!cancelled)setError('The avatar artwork could not load. Please reload to try again.');});
    return()=>{cancelled=true;};
  },[config,onReady]);
  return <span className={`custom-avatar${small?' compact':''}`}><canvas ref={ref} width={1024} height={1536} role="img" aria-label={avatarDescription(config)}/>{error&&<span role="alert" className="avatar-error">{error}</span>}</span>;
}

const palette=['#2c7273','#b85746','#714351','#d5a54a','#304a3d','#f4eee0','#30364e','#784c34'];
export default function AvatarCreator({value,onChange}:{value:unknown;onChange:(config:AvatarConfig)=>void}) {
  const config=useMemo(()=>normalizeAvatar(value),[value]);const [ready,setReady]=useState(false);const [message,setMessage]=useState('');
  function update<K extends keyof AvatarConfig>(key:K,val:AvatarConfig[K]){setMessage('');onChange({...config,[key]:val});}
  async function download(){try{const image=await drawAvatar(document.createElement('canvas'),config);const a=document.createElement('a');a.download='my-story-village-avatar.png';a.href=image.toDataURL('image/png');a.click();setMessage('Avatar PNG prepared. Check your browser’s downloads.');}catch{setMessage('The download could not be created. Please try again.');}}
  return <div className="layered-editor"><div className="creator-preview"><div className="creator-stage" style={{background:config.backdrop}}><CustomAvatar config={config} onReady={setReady}/></div><p className="creator-caption">Your story. Your own look.</p><button type="button" disabled={!ready} onClick={download}>Download avatar PNG ↓</button><span className="creator-status" role="status">{message}</span><small>Illustrated draft · cultural review pending</small></div><div className="creator-controls">
    <fieldset><legend>Make it yours</legend><label>Body frame<select value={config.frame} onChange={e=>update('frame',e.target.value as AvatarConfig['frame'])}><option value="soft">Soft frame</option><option value="broad">Broad frame</option></select></label><label>Hair<select value={config.hair} onChange={e=>update('hair',e.target.value as AvatarConfig['hair'])}><option value="short">Short curls</option><option value="long">Long waves</option><option value="bun">Silver bun</option><option value="none">No hair</option></select></label><p className="control-note">All clothing and hairstyles are available with either frame.</p></fieldset>
    <fieldset><legend>Clothing</legend><label>Outfit<select value={config.outfit} onChange={e=>update('outfit',e.target.value as AvatarConfig['outfit'])}><option value="shirt">Shirt &amp; tupenu</option><option value="dress">Dress</option></select></label><ColorControl label={config.outfit==='dress'?'Dress colour':'Shirt colour'} value={config.topColor} onChange={v=>update('topColor',v)}/>{config.outfit==='shirt'&&<ColorControl label="Tupenu colour" value={config.bottomColor} onChange={v=>update('bottomColor',v)}/>}<label>Outer waistwear<select value={config.waistwear} onChange={e=>update('waistwear',e.target.value as AvatarConfig['waistwear'])}><option value="none">None</option><option value="taovala">Taʻovala · illustrated draft</option><option value="kiekie">Kiekie · illustrated draft</option></select></label></fieldset>
    <fieldset><legend>A finishing touch</legend><label>Flower placement<select value={config.flower} onChange={e=>update('flower',e.target.value as AvatarConfig['flower'])}><option value="none">None</option><option value="left">Viewer’s left</option><option value="right">Viewer’s right</option></select></label><p className="control-note">A generic decorative flower. Placement carries no stated cultural meaning.</p><label>Profile backdrop<input type="color" value={config.backdrop} onChange={e=>update('backdrop',e.target.value)}/></label></fieldset>
    <button type="button" onClick={()=>onChange({...defaultAvatar})}>Reset custom look</button><p className="art-note">Clothing and adornments are illustrative drafts awaiting DR L.V.S. review. <a href="/visual-notes/">Artwork &amp; sources →</a></p>
  </div></div>;
}

function ColorControl({label,value,onChange}:{label:string;value:string;onChange:(value:string)=>void}) {
  return <div className="colour-control"><label>{label}<input type="color" value={value} onChange={e=>onChange(e.target.value)}/></label><div className="colour-swatches" aria-label={`${label} palette`}>{palette.map(c=><button type="button" key={c} style={{backgroundColor:c}} aria-label={`${label} ${c}`} aria-pressed={value===c} onClick={()=>onChange(c)}><span>{value===c?'✓':''}</span></button>)}</div></div>;
}
