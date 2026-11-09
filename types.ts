
export enum ParticleShape {
  SPHERE = '🔮',
  HEART = '❤️',
  FLOWER = '🌸',
  SATURN = '🪐',
  FIREWORKS = '🎆',
  HAND = '✋',
  STAR = '⭐',
  BICYCLE = '🚲',
  PYRAMID = '🔺',
  PLANE = '✈️',
  SPACE_SHUTTLE = '🚀',
  UFO = '🛸',
  HOUSE = '🏠',
  COMET = '☄️',
  SUN = '☀️',
  HORSE = '🐎',
  EMPIRE_STATE = '🏙️',
  SPHINX = '🗿',
  DINOSAUR = '🦖',
  SHOOTING_STAR = '💫',
  WHEEL = '🛞',
  SPOON = '🥄',
  CHESS_PIECE = '♟️',
  TSHIRT = '👕',
}

export type VoiceMode = 'normal' | 'text';

export interface ParticleState {
  count: number;
  shape: ParticleShape;
  color: string;
  handOpen: number;
  handPosition: { x: number; y: number };
  isTracking: boolean;
  arMode: boolean;
  // Voice states
  isListening: boolean;
  voiceMode: VoiceMode;
  voiceText: string;
  setShape: (shape: ParticleShape) => void;
  setColor: (color: string) => void;
  setHandStatus: (open: number, x: number, y: number) => void;
  setIsTracking: (isTracking: boolean) => void;
  setArMode: (arMode: boolean) => void;
  // Voice actions
  setIsListening: (isListening: boolean) => void;
  setVoiceText: (text: string) => void;
  setVoiceMode: (mode: VoiceMode) => void;
}
