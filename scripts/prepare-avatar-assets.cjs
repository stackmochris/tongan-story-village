const fs=require('fs');
const sharp=require('sharp');
const crypto=require('crypto');
(async()=>{
 fs.mkdirSync('public/art/avatar',{recursive:true});
 const manifest={version:1,canvas:[1024,1536],culturalApproval:'Pending DR L.V.S. review',assets:[]};
 for(const file of fs.readdirSync('assets/avatar-layers').filter(f=>f.endsWith('.png')).sort()){
  const id=file.replace('.png',''); const source='assets/avatar-layers/'+file; const target='public/art/avatar/'+id+'.webp';
  await sharp(source).resize({width:id.startsWith('base-')?768:600,withoutEnlargement:true}).webp({quality:90,alphaQuality:100}).toFile(target);
  const {data,info}=await sharp(target).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let left=info.width,top=info.height,right=0,bottom=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>8){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}
  manifest.assets.push({id,source,url:'/art/avatar/'+id+'.webp',width:info.width,height:info.height,bounds:[left,top,right-left+1,bottom-top+1],mask:'Native alpha channel; exact garment silhouette',sha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')});
 }
 fs.writeFileSync('lib/avatar-art.json',JSON.stringify(manifest,null,2)+'\n');
 console.log('Prepared '+manifest.assets.length+' avatar layers');
})();
