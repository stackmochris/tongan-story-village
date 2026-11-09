export type AvatarConfig = {
  version: 1;
  frame: 'soft' | 'broad';
  hair: 'short' | 'long' | 'bun' | 'none';
  outfit: 'shirt' | 'dress';
  waistwear: 'none' | 'taovala' | 'kiekie';
  flower: 'none' | 'left' | 'right';
  topColor: string;
  bottomColor: string;
  backdrop: string;
};

export const defaultAvatar: AvatarConfig = {
  version: 1, frame: 'soft', hair: 'short', outfit: 'shirt', waistwear: 'none',
  flower: 'none', topColor: '#2c7273', bottomColor: '#30364e', backdrop: '#e8ddc4',
};
const oneOf = <T extends string>(value: unknown, allowed: readonly T[], fallback:T): T =>
  allowed.includes(value as T) ? value as T : fallback;
const color = (value:unknown, fallback:string) => typeof value==='string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;

// Treat persisted browser data as input. Old profiles remain usable without a migration.
export function normalizeAvatar(value:unknown): AvatarConfig {
  const v = value && typeof value==='object' ? value as Record<string,unknown> : {};
  return {
    version:1,
    frame:oneOf(v.frame,['soft','broad'],defaultAvatar.frame),
    hair:oneOf(v.hair,['short','long','bun','none'],defaultAvatar.hair),
    outfit:oneOf(v.outfit,['shirt','dress'],defaultAvatar.outfit),
    waistwear:oneOf(v.waistwear,['none','taovala','kiekie'],defaultAvatar.waistwear),
    flower:oneOf(v.flower,['none','left','right'],defaultAvatar.flower),
    topColor:color(v.topColor,defaultAvatar.topColor),
    bottomColor:color(v.bottomColor,defaultAvatar.bottomColor),
    backdrop:color(v.backdrop,defaultAvatar.backdrop),
  };
}

export type AvatarLayer = {id:string;src:string;rect:[number,number,number,number];tint?:string};
const root='/art/avatar/';
export function avatarLayers(value:AvatarConfig):AvatarLayer[] {
  const c=normalizeAvatar(value);
  const layers:AvatarLayer[]=[{id:'body',src:`${root}base-${c.frame}.webp`,rect:[0,0,1024,1536]}];
  if(c.outfit==='shirt') layers.push(
    {id:'tupenu',src:`${root}tupenu.webp`,rect:[320,890,384,450],tint:c.bottomColor},
    {id:'shirt',src:`${root}${c.frame==='broad'?'shirt-broad':'shirt'}.webp`,rect:c.frame==='broad'?[232,535,560,435]:[252,535,520,435],tint:c.topColor},
  );
  else layers.push({id:'dress',src:`${root}dress.webp`,rect:[265,550,494,790],tint:c.topColor});
  if(c.waistwear!=='none') layers.push({id:'waistwear',src:`${root}${c.waistwear}.webp`,rect:c.waistwear==='taovala'?[300,900,424,190]:[286,900,452,280]});
  // Restore the chin above garment necklines, preserving identical head registration.
  layers.push({id:'head',src:`${root}base-${c.frame}.webp`,rect:[0,0,1024,570]});
  if(c.hair!=='none') layers.push({id:'hair',src:`${root}hair-${c.hair}.webp`,rect:c.hair==='long'?[245,145,534,700]:c.hair==='bun'?[300,100,424,300]:[290,145,444,245]});
  if(c.flower!=='none') layers.push({id:'flower',src:`${root}flower.webp`,rect:[c.flower==='left'?295:610,300,120,120]});
  return layers;
}

export function avatarDescription(c:AvatarConfig) {
  const hair={short:'short curls',long:'long waves',bun:'a silver bun',none:'a bald head'}[c.hair];
  const waist={none:'no outer waistwear',taovala:'an illustrative taʻovala',kiekie:'an illustrative kiekie'}[c.waistwear];
  return `Custom illustrated adult avatar with ${hair}, ${c.outfit==='shirt'?'a collared shirt and tupenu':'a dress'}, ${waist}${c.flower==='none'?'':`, a generic flower on the viewer’s ${c.flower}`}. Cultural review pending.`;
}
