import React, { useState } from 'react';
import { Sidebar, Grid2X2 } from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { UserGame } from './components/UserGame';
import { useGameState } from './services/gameStore';

const App: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'ADMIN' | 'USER'>('HOME');

  if (view === 'HOME') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-6 relative">
        <div className="max-w-xl w-full text-center space-y-12 animate-in fade-in duration-1000">
          
          <div className="space-y-4">
            <div className="w-24 h-24 border-2 border-daylight-text/10 rounded-full mx-auto flex items-center justify-center bg-white shadow-sm">
               <span className="text-5xl">☀︎</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-serif font-medium text-daylight-text tracking-tight leading-none">
              Visual<br/>Metaphor
            </h1>
            <p className="text-xl text-daylight-subtle font-sans tracking-wide">
              Team Connection Workshop
            </p>
          </div>
          
          <div className="space-y-4 max-w-sm mx-auto">
            <button 
              onClick={() => setView('USER')}
              className="group w-full py-5 bg-daylight-text text-white rounded-full font-sans font-medium text-lg hover:bg-daylight-accent transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Enter as Participant
            </button>
            <button 
              onClick={() => setView('ADMIN')}
              className="group w-full py-5 bg-transparent text-daylight-text border border-daylight-text/20 rounded-full font-sans font-medium text-lg hover:border-daylight-text transition-all duration-300"
            >
              Enter as Facilitator
            </button>
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-daylight-subtle text-xs font-serif italic">Designed for deep connection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-daylight-bg relative">
      <button 
        onClick={() => setView('HOME')}
        className="absolute top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white border border-daylight-border text-daylight-subtle hover:text-daylight-text transition-colors shadow-sm"
      >
        <Sidebar size={20} />
      </button>

      <div className="flex-1 h-full w-full overflow-hidden">
        {view === 'ADMIN' ? <AdminPanel /> : <UserGame />}
      </div>
    </div>
  );
};

export default App;