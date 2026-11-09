import { create } from 'zustand';
import { ParticleShape, ParticleState, VoiceMode } from './types';

export const useStore = create<ParticleState>((set) => ({
  count: 15000,
  shape: ParticleShape.HEART,
  color: '#ff0066',
  handOpen: 1,
  handPosition: { x: 0, y: 0 },
  isTracking: false,
  arMode: false,
  // Voice
  isListening: false,
  voiceMode: 'normal',
  voiceText: '',
  
  setShape: (shape) => set({ shape, voiceMode: 'normal' }),
  setColor: (color) => set({ color }),
  setHandStatus: (open, x, y) => set({ handOpen: open, handPosition: { x, y } }),
  setIsTracking: (isTracking) => set({ isTracking }),
  setArMode: (arMode) => set({ arMode }),
  // Voice Actions
  setIsListening: (isListening) => set({ isListening }),
  setVoiceText: (voiceText) => set({ voiceText }),
  setVoiceMode: (voiceMode) => set({ voiceMode }),
}));
