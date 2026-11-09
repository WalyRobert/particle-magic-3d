import React from 'react';
import Scene from './components/Scene';
import UI from './components/UI';
import HandDetection from './components/HandDetection';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <Scene />
      <UI />
      <HandDetection />
    </div>
  );
};

export default App;
