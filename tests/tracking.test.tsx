import React from 'react';
import {it,expect,vi} from 'vitest';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
const mocked=vi.hoisted(()=>({create:vi.fn(),vision:vi.fn(async()=>({}))}));
vi.mock('@mediapipe/tasks-vision',()=>({FilesetResolver:{forVisionTasks:mocked.vision},HandLandmarker:{createFromOptions:mocked.create}}));
import HandDetection from '../components/HandDetection';
it('não acessa câmera sem ação e fecha o modelo que termina após desmontar',async()=>{
 let finish:(value:any)=>void=()=>{};const close=vi.fn();mocked.create.mockImplementation(()=>new Promise(resolve=>{finish=resolve;}));
 const camera=vi.fn();Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:camera}});
 const {unmount}=render(<HandDetection/>);expect(camera).not.toHaveBeenCalled();expect(mocked.create).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'Ativar câmera'}));await waitFor(()=>expect(mocked.create).toHaveBeenCalled());unmount();finish({close});await waitFor(()=>expect(close).toHaveBeenCalledOnce());expect(camera).not.toHaveBeenCalled();
});
