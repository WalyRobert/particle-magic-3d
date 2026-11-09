
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { ParticleShape, VoiceMode } from '../types';
import { VoiceManager } from '../voiceUtils';

const UI: React.FC = () => {
  const { 
    shape, setShape, color, setColor, isTracking, handOpen, arMode, setArMode,
    isListening, setIsListening, voiceMode, setVoiceMode, voiceText, setVoiceText
  } = useStore();

  const [showShapes, setShowShapes] = useState(true);
  const voiceManagerRef = useRef<VoiceManager | null>(null);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setShowShapes(false);
    }, 3000);
  };

  useEffect(() => {
    voiceManagerRef.current = new VoiceManager((cmd) => {
      if (cmd.type === 'text') {
        setVoiceText(cmd.value as string);
        setVoiceMode('text');
      } else if (cmd.type === 'shape') {
        setShape(cmd.value as ParticleShape);
        setVoiceMode('normal');
      } else if (cmd.type === 'stop') {
        setVoiceMode('normal');
        setVoiceText('');
      }
    });

    startTimer();

    return () => {
      voiceManagerRef.current?.stop();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const toggleVoice = () => {
    if (isListening) {
      voiceManagerRef.current?.stop();
      setIsListening(false);
    } else {
      if(voiceManagerRef.current?.start())setIsListening(true);
      else alert('Reconhecimento de voz indisponível neste navegador. Use os botões.');
    }
  };

  const handleShapeClick = (s: ParticleShape) => {
    setShape(s);
    setShowShapes(true);
    startTimer();
  };

  const colors = ['#ff0066', '#00ccff', '#ffcc00', '#cc00ff', '#00ff99', '#ffffff'];

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-6 flex flex-col justify-between z-50">
      {/* Header */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
            Particle Magic 3.0
          </h1>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-white/60 text-xs max-w-md bg-black/20 p-2 rounded">
              🎙️ Diga: <span className="text-white">"Escrever Olá"</span>, <span className="text-white">"Desenhar Estrela"</span> ou <span className="text-white">"Parar"</span>.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">
              {isTracking ? (handOpen > 0.5 ? 'Mão Aberta' : 'Mão Fechada') : 'Sem rastreio'}
            </span>
          </div>

          <div className="flex gap-2">
            {/* Voice Toggle */}
            <button 
              onClick={toggleVoice}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 pointer-events-auto ${
                isListening 
                  ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                  : 'bg-black/60 backdrop-blur-md border-white/10 text-white/80 hover:bg-white/10'
              }`}
              title="Ativar Voz"
            >
              <span className="text-xl">{isListening ? '🛑' : '🎙️'}</span>
            </button>

            {/* Toggle Shapes Menu if Hidden */}
            {!showShapes && (
              <button 
                onClick={() => { setShowShapes(true); startTimer(); }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/10 transition-all duration-300 pointer-events-auto"
                title="Mostrar Formas"
              >
                <span className="text-xl">🎨</span>
              </button>
            )}

            <button 
              onClick={() => setArMode(!arMode)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 pointer-events-auto ${
                arMode 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]' 
                  : 'bg-black/60 backdrop-blur-md border-white/10 text-white/80'
              }`}
            >
              <span className="text-sm">{arMode ? '📷 AR' : '🌑 3D'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pointer-events-auto flex flex-col gap-4 items-start">
        {/* Shapes Menu with Smooth Transition */}
        <div className={`bg-black/40 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-2xl max-h-[40vh] overflow-y-auto transition-all duration-500 ease-in-out ${
          showShapes ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black block">Formas</label>
            <button 
              onClick={() => setShowShapes(false)}
              className="text-white/20 hover:text-white/60 transition-colors text-[10px]"
            >
              FECHAR
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Object.values(ParticleShape).map((s) => (
              <button
                key={s}
                onClick={() => handleShapeClick(s)}
                className={`w-10 h-10 flex items-center justify-center rounded-2xl text-xl transition-all duration-300 ${
                  shape === s && voiceMode === 'normal'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110'
                    : 'bg-white/5 text-white hover:bg-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  color === c ? 'border-white scale-125 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded-full overflow-hidden border-0 p-0 bg-transparent cursor-pointer scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default UI;
