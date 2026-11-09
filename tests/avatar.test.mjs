import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {avatarLayers,defaultAvatar,normalizeAvatar} from '../lib/avatar.ts';

test('corrupt and old saved profiles normalize to valid choices',()=>{
  for(const input of [null,undefined,17,'old profile',{}, {frame:'missing',hair:'oops',outfit:'bad',flower:'top',waistwear:'royal',topColor:'url(https://example.com)',bottomColor:'red',backdrop:'#fff'}]){
    assert.deepEqual(normalizeAvatar(input),defaultAvatar);
  }
});

test('all 144 appearance combinations resolve to present, bounded layers',()=>{
  let combinations=0;
  for(const frame of ['soft','broad'])for(const hair of ['short','long','bun','none'])for(const outfit of ['shirt','dress'])for(const waistwear of ['none','taovala','kiekie'])for(const flower of ['none','left','right']){
    const layers=avatarLayers({...defaultAvatar,frame,hair,outfit,waistwear,flower});
    assert.equal(layers[0].id,'body');
    assert.equal(layers.filter(l=>l.id==='body').length,1);
    assert.equal(layers.some(l=>l.id==='hair'),hair!=='none');
    assert.equal(layers.some(l=>l.id==='waistwear'),waistwear!=='none');
    assert.equal(layers.some(l=>l.id==='flower'),flower!=='none');
    assert.equal(layers.some(l=>l.id==='tupenu'),outfit==='shirt');
    for(const layer of layers){
      assert.ok(existsSync('public'+layer.src),layer.src);
      const [x,y,w,h]=layer.rect;
      assert.ok(x>=0&&y>=0&&w>0&&h>0&&x+w<=1024&&y+h<=1536,layer.id);
      if(layer.id==='body'||layer.id==='hair'||layer.id==='flower'||layer.id==='waistwear')assert.equal(layer.tint,undefined);
    }
    combinations++;
  }
  assert.equal(combinations,144);
});

test('garment colours remain independent and flower placement really moves',()=>{
  const c={...defaultAvatar,topColor:'#b85746',bottomColor:'#d5a54a'};
  assert.equal(avatarLayers(c).find(l=>l.id==='shirt').tint,'#b85746');
  assert.equal(avatarLayers(c).find(l=>l.id==='tupenu').tint,'#d5a54a');
  const left=avatarLayers({...c,flower:'left'}).find(l=>l.id==='flower');
  const right=avatarLayers({...c,flower:'right'}).find(l=>l.id==='flower');
  assert.ok(left.rect[0]<512&&right.rect[0]>512);
});
