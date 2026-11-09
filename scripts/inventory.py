from pathlib import Path
import hashlib,json
rows=[]
for p in sorted(Path('assets/wedding-scroller').rglob('*')):
 if p.is_file(): rows.append(dict(path=p.as_posix(),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),source='https://github.com/stackmochris/tongan-wedding-scroller/blob/0f4051ea05b14f0c6bcc06538f7c3ef7e5350e6c/assets/demo/'+p.relative_to('assets/wedding-scroller').as_posix(),status='vector stand-in (PNG is raster export)',culturalApproval='No recorded DR L.V.S. approval'))
for p in sorted(list(Path('public/art').glob('*')) + list(Path('assets').glob('*.png'))):
 if p.is_file(): rows.append(dict(path=p.as_posix(),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),source='Original Story Village draft, 2026-11-09',status='new AI-assisted illustration' if p.suffix in ['.png','.webp'] else 'original code-authored geometric approximation',culturalApproval='Pending DR L.V.S. review'))
for folder in ['assets/workspace-references','assets/opening-illustrations']:
 for p in sorted(Path(folder).glob('*.png')):
  rows.append(dict(path=p.as_posix(),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),source='Existing local workspace '+folder,status='Illustrated source/reference; not independent production layers',culturalApproval='No recorded DR L.V.S. approval'))
for p in sorted(Path('public/art/reference').glob('*.webp')):
 rows.append(dict(path=p.as_posix(),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),source='WebP derivative of existing local source; filename stem maps to source PNG; turnaround maps to source-0',status='Production/reference derivative',culturalApproval='Pending DR L.V.S. review'))
for folder in ['assets/avatar-layers','public/art/avatar']:
 for p in sorted(Path(folder).glob('*')):
  if p.is_file(): rows.append(dict(path=p.as_posix(),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),source='Original built-in image generation; prompts in assets/avatar-layer-prompts.json',status='Independent modular raster layer; native alpha mask',culturalApproval='Pending DR L.V.S. review'))
Path('assets/inventory.json').write_text(json.dumps({'date':'2026-11-09','files':rows},indent=2)+'\n',encoding='utf-8')
