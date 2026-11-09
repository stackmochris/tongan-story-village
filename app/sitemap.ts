import {stories} from '../lib/data';
export const dynamic='force-static';
export default function sitemap(){const root='https://tongan-story-village.opalhen64.chatgpt.site';return [{url:root},{url:`${root}/visual-notes/`},...stories.map(s=>({url:`${root}/stories/${s.id}/`}))]}
