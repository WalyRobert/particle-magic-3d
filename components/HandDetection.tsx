import {useEffect,useRef,useState} from 'react';
import {FilesetResolver,HandLandmarker} from '@mediapipe/tasks-vision';
import {useStore} from '../store';
const VERSION='0.10.22-rc.20250304';
export default function HandDetection(){
 const video=useRef<HTMLVideoElement>(null);
 const arMode=useStore(s=>s.arMode),setHandStatus=useStore(s=>s.setHandStatus),setIsTracking=useStore(s=>s.setIsTracking);
 const [enabled,setEnabled]=useState(false),[status,setStatus]=useState('Câmera desativada');
 useEffect(()=>{
  if(!enabled)return;
  let cancelled=false,tracker:HandLandmarker|null=null,stream:MediaStream|null=null,raf=0,lastTime=-1,lastFrame=0;
  const element=video.current;
  const stop=()=>{cancelAnimationFrame(raf);stream?.getTracks().forEach(t=>t.stop());tracker?.close();tracker=null;if(element)element.srcObject=null;setIsTracking(false);};
  const start=async()=>{
   try{
    if(!navigator.mediaDevices?.getUserMedia)throw new Error('Câmera exige HTTPS ou localhost e navegador compatível.');
    setStatus('Carregando reconhecimento de mãos…');
    const vision=await FilesetResolver.forVisionTasks(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}/wasm`);
    if(cancelled)return;
    const options={baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',delegate:'GPU' as const},runningMode:'VIDEO' as const,numHands:1};
    try{tracker=await HandLandmarker.createFromOptions(vision,options);}catch{if(cancelled)return;tracker=await HandLandmarker.createFromOptions(vision,{...options,baseOptions:{...options.baseOptions,delegate:'CPU'}});}
    if(cancelled){tracker?.close();tracker=null;return;}
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:arMode?'environment':'user',width:{ideal:640},height:{ideal:480}},audio:false});
    if(cancelled){stop();return;}
    if(!element){stop();return;}
    element.srcObject=stream;await element.play();if(cancelled){stop();return;}
    setStatus('Rastreamento ativo');
    const predict=(now:number)=>{
     if(cancelled)return;
     if(tracker&&element.readyState>=2&&now-lastFrame>=66&&element.currentTime!==lastTime){
      lastFrame=now;lastTime=element.currentTime;
      try{const result=tracker.detectForVideo(element,now);const points=result.landmarks?.[0];
       if(points){const distance=Math.hypot(points[4].x-points[8].x,points[4].y-points[8].y);setHandStatus(Math.max(0,Math.min(1,(distance-.03)/.12)),arMode?points[9].x*2-1:(1-points[9].x)*2-1,1-points[9].y*2);setIsTracking(true);}else setIsTracking(false);
      }catch{setStatus('Falha no rastreamento. Desative e tente novamente.');stop();return;}
     }
     raf=requestAnimationFrame(predict);
    };
    raf=requestAnimationFrame(predict);
   }catch(error){stop();if(!cancelled)setStatus(error instanceof Error?error.message:'Não foi possível iniciar a câmera.');}
  };
  void start();return()=>{cancelled=true;stop();};
 },[enabled,arMode,setHandStatus,setIsTracking]);
 return <><div className={arMode?'fixed inset-0 z-0 pointer-events-none':'absolute bottom-4 right-4 w-48 h-36 z-40 rounded-lg overflow-hidden bg-black/60'}><video ref={video} autoPlay muted playsInline className={`w-full h-full object-cover ${arMode?'':'scale-x-[-1]'}`}/></div><div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg max-w-xs"><p role="status" className="text-xs mb-2">{enabled?status:'Câmera desativada. As formas funcionam sem ela.'}</p><button className="px-3 py-2 bg-indigo-600 rounded text-sm" onClick={()=>setEnabled(value=>!value)}>{enabled?'Desativar câmera':'Ativar câmera'}</button></div></>;
}
