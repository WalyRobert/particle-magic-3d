import { ParticleShape } from './types';

interface RecognitionEvent extends Event {
  results: {length:number;[index:number]:{[index:number]:{transcript:string}}};
}

const SHAPE_MAP: Record<string, ParticleShape> = {
  'coração': ParticleShape.HEART,
  'flor': ParticleShape.FLOWER,
  'saturno': ParticleShape.SATURN,
  'fogo': ParticleShape.FIREWORKS,
  'mão': ParticleShape.HAND,
  'estrela': ParticleShape.STAR,
  'bicicleta': ParticleShape.BICYCLE,
  'pirâmide': ParticleShape.PYRAMID,
  'avião': ParticleShape.PLANE,
  'foguete': ParticleShape.SPACE_SHUTTLE,
  'disco': ParticleShape.UFO,
  'casa': ParticleShape.HOUSE,
  'cometa': ParticleShape.COMET,
  'sol': ParticleShape.SUN,
  'cavalo': ParticleShape.HORSE,
  'prédio': ParticleShape.EMPIRE_STATE,
  'esfinge': ParticleShape.SPHINX,
  'dinossauro': ParticleShape.DINOSAUR,
  'cadente': ParticleShape.SHOOTING_STAR,
  'roda': ParticleShape.WHEEL,
  'colher': ParticleShape.SPOON,
  'xadrez': ParticleShape.CHESS_PIECE,
  'camiseta': ParticleShape.TSHIRT,
};

export class VoiceManager {
  private recognition: any;
  private onCommand: (cmd: { type: 'text' | 'shape' | 'stop', value?: string | ParticleShape }) => void;

  constructor(onCommand: VoiceManager['onCommand']) {
    this.onCommand = onCommand;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = 'pt-BR';
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: RecognitionEvent) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();


        if (transcript.includes('escrever')) {
          const parts = transcript.split('escrever');
          const text = parts[parts.length - 1].trim();
          if (text) this.onCommand({ type: 'text', value: text });
        } else if (transcript.includes('desenhar')) {
          const parts = transcript.split('desenhar');
          const target = parts[parts.length - 1].trim();
          const shape = Object.entries(SHAPE_MAP).find(([key]) => target.includes(key))?.[1];
          if (shape) this.onCommand({ type: 'shape', value: shape });
        } else if (transcript.includes('parar') || transcript.includes('voltar')) {
          this.onCommand({ type: 'stop' });
        }
      };
    }
  }

  isSupported(){ return Boolean(this.recognition); }

  start() {
    if (this.recognition) {
      try {
        this.recognition.start();
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
