import {initializeApp,getApps} from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {getFirestore,doc,setDoc,serverTimestamp} from 'firebase/firestore';
// Explicit opt-in; the public sprint stays in local demo mode even if config exists.
const config={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID};
export const firebaseReady=Object.values(config).every(Boolean);
export function services(){if(!firebaseReady)throw new Error('Firebase is not configured. Use fictional local demo mode.');const app=getApps()[0]||initializeApp(config);return {auth:getAuth(app),db:getFirestore(app)}}
export async function register(email:string,password:string){return createUserWithEmailAndPassword(services().auth,email,password)}
export async function login(email:string,password:string){return signInWithEmailAndPassword(services().auth,email,password)}
export async function logout(){return signOut(services().auth)}
export async function savePrivateProfile(uid:string,data:Record<string,unknown>){await setDoc(doc(services().db,'profiles',uid),{...data,ownerId:uid,updatedAt:serverTimestamp()})}
export async function submitDraft(uid:string,id:string,title:string,body:string){await setDoc(doc(services().db,'drafts',id),{authorId:uid,title,body,status:'draft',createdAt:serverTimestamp()})}
