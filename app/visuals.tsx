export const avatarOptions = [
  {id:'sione',label:'Teal & curls',description:'Short dark curls, teal casual shirt and tan shorts'},
  {id:'mele',label:'Coral & long hair',description:'Long dark hair, coral top and teal skirt'},
  {id:'driver',label:'Blue & tupenu',description:'Short dark hair, blue collared shirt and dark tupenu'},
  {id:'elder',label:'Plum & silver bun',description:'Silver bun, plum dress and small illustrated waist mat'},
  {id:'shopkeeper',label:'Ochre & waves',description:'Wavy dark hair and ochre dress'},
  {id:'source-sione',label:'Original arrival · teal',description:'Existing arrival illustration, teal shirt and tan shorts'},
  {id:'source-mele',label:'Original arrival · coral',description:'Existing arrival illustration, coral top, denim skirt and flower'},
  {id:'source-driver',label:'Original patterned shirt',description:'Existing adult driver illustration, patterned shirt and tupenu'},
  {id:'source-turnaround',label:'Original teal & tupenu',description:'Existing turnaround illustration, curls, teal collared shirt and navy tupenu'},
];

// One cached, transparent sheet; each equal-width column contains a complete figure.
export function Avatar({id='sione',small=false}:{id?:string;small?:boolean}) {
  const index=Math.max(0,avatarOptions.findIndex(a=>a.id===id));
  const art=avatarOptions[index];
  if(art.id.startsWith('source-')) {
    const turnaround=art.id==='source-turnaround';
    const row=art.id==='source-mele'?1:art.id==='source-driver'?2:0;
    return <span className={`avatar raster-avatar source-avatar${turnaround?' turnaround':''}${small?' small':''}`} role="img" aria-label={`${art.description}; cultural review pending`}><img src={turnaround?'/art/reference/turnaround.webp':'/art/reference/arrival-characters.webp'} alt="" style={{top:`-${row*100}%`}}/></span>;
  }
  return <span className={`avatar raster-avatar${small?' small':''}`} role="img" aria-label={`Draft illustrated avatar: ${art.description}`} style={{backgroundPosition:`${index*25}% center`}}/>;
}

export function Art({kind}:{kind:string}) {
  const id=kind==='suitcase'?'elder':kind==='letter'?'mele':kind==='plant'?'driver':'shopkeeper';
  return <div className={`art story-art ${kind}`} aria-hidden="true"><img className="card-botanical" src="/art/botanical-draft.webp" alt="" loading="lazy" width="280" height="180"/><Avatar id={id}/><span className="art-thread"/></div>;
}
