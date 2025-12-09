import React, { useState } from 'react';
import { GameState, ADMIN_PASSWORD } from '../types';
import { useGameState } from '../services/gameStore';
import { Users, Play, Eye, Trophy, CheckCircle, RotateCcw } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { state, updateState, resetGame } = useGameState();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Setup Form State
  const [orgName, setOrgName] = useState('');
  const [numTeams, setNumTeams] = useState(2);
  const [q1, setQ1] = useState(state.prompts[0].text);
  const [q2, setQ2] = useState(state.prompts[1].text);
  const [q3, setQ3] = useState(state.prompts[2].text);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert("Incorrect password.");
  };

  const handleCreateRoom = () => {
    updateState(prev => ({
      ...prev,
      orgName,
      totalTeams: numTeams,
      prompts: [
        { id: 0, text: q1 },
        { id: 1, text: q2 },
        { id: 2, text: q3 },
      ],
      status: 'WAITING',
      users: [],
      revealResults: false,
    }));
  };

  const calculateScores = () => {
     updateState(prev => {
        const newUsers = prev.users.map(user => {
            let score = 0;
            // Iterate through prompts
            prev.prompts.forEach(p => {
                const teamMembers = prev.users.filter(u => u.teamId === user.teamId && u.id !== user.id);
                // Get user's guesses for this prompt
                const userGuesses = user.guesses[p.id] || {};
                
                teamMembers.forEach(teammate => {
                    const selectedImageId = teammate.selections[p.id]?.id;
                    const guessedOwnerId = userGuesses[selectedImageId || ''];
                    
                    if (guessedOwnerId === teammate.id) {
                        score += 10;
                    }
                });
            });
            return { ...user, score };
        });
        return { ...prev, users: newUsers, revealResults: true, status: 'RESULTS' };
     });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in zoom-in duration-500 bg-daylight-bg">
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-daylight-border max-w-md w-full text-center">
          <h2 className="text-3xl font-serif text-daylight-text mb-6">Facilitator Access</h2>
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded-xl bg-daylight-bg border-transparent focus:bg-white focus:border-daylight-accent focus:ring-0 outline-none mb-4 font-serif text-lg text-center tracking-widest"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-daylight-text text-white rounded-full font-sans font-medium hover:bg-daylight-accent transition-colors"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  // Setup Phase
  if (state.status === 'SETUP') {
    return (
      <div className="max-w-3xl mx-auto p-8 h-full overflow-y-auto">
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-daylight-border">
           <h1 className="text-4xl font-serif text-daylight-text mb-8 border-b border-daylight-border pb-4">Session Setup</h1>
           
           <div className="space-y-8">
             <div>
               <label className="block text-sm font-bold text-daylight-subtle mb-2 uppercase tracking-wide">Organization</label>
               <input value={orgName} onChange={e => setOrgName(e.target.value)} className="w-full p-4 bg-daylight-bg rounded-xl font-serif text-xl border border-transparent focus:border-daylight-accent focus:bg-white focus:ring-0 outline-none" placeholder="e.g. Design Team" />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-daylight-subtle mb-2 uppercase tracking-wide">Number of Teams</label>
               <input type="number" min={2} max={20} value={numTeams} onChange={e => setNumTeams(Number(e.target.value))} className="w-full p-4 bg-daylight-bg rounded-xl font-serif text-xl border border-transparent focus:border-daylight-accent focus:bg-white focus:ring-0 outline-none" />
             </div>

             <div className="space-y-4 pt-4">
               <h3 className="font-serif text-2xl text-daylight-text">Discussion Prompts</h3>
               <input value={q1} onChange={e => setQ1(e.target.value)} className="w-full p-4 bg-daylight-bg border border-transparent focus:border-daylight-accent focus:bg-white focus:ring-0 rounded-xl font-sans" />
               <input value={q2} onChange={e => setQ2(e.target.value)} className="w-full p-4 bg-daylight-bg border border-transparent focus:border-daylight-accent focus:bg-white focus:ring-0 rounded-xl font-sans" />
               <input value={q3} onChange={e => setQ3(e.target.value)} className="w-full p-4 bg-daylight-bg border border-transparent focus:border-daylight-accent focus:bg-white focus:ring-0 rounded-xl font-sans" />
             </div>

             <button onClick={handleCreateRoom} className="w-full py-5 bg-daylight-text text-white rounded-full font-sans font-bold text-lg hover:bg-daylight-accent transition-colors shadow-lg mt-4">
               Open Room
             </button>
           </div>
        </div>
      </div>
    );
  }

  // Dashboard Phase
  return (
    <div className="h-full flex flex-col p-6 md:p-10 overflow-hidden bg-daylight-bg">
      <header className="flex justify-between items-center mb-10">
         <div>
            <h1 className="text-4xl font-serif text-daylight-text mb-1">{state.orgName || 'Dashboard'}</h1>
            <div className="flex gap-4 text-sm text-daylight-subtle font-sans">
               <span className="flex items-center gap-1"><span className="w-2 h-2 bg-daylight-accent rounded-full"></span> {state.status}</span>
               <span>{state.users.length} Participants</span>
            </div>
         </div>
         <div className="flex gap-3">
            {state.status === 'WAITING' && (
              <button onClick={() => updateState(prev => ({...prev, status: 'PLAYING'}))} className="px-6 py-3 bg-daylight-text text-white rounded-full font-medium shadow-md hover:bg-daylight-accent transition-colors flex items-center gap-2">
                <Play size={18} /> Start Session
              </button>
            )}
            {state.status === 'PLAYING' && (
              <button onClick={() => updateState(prev => ({...prev, status: 'MATCHING'}))} className="px-6 py-3 bg-daylight-text text-white rounded-full font-medium shadow-md hover:bg-daylight-accent transition-colors flex items-center gap-2">
                <Users size={18} /> Start Matching
              </button>
            )}
            {state.status === 'MATCHING' && (
              <button onClick={calculateScores} className="px-6 py-3 bg-daylight-accent text-white rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Trophy size={18} /> Reveal Results
              </button>
            )}
            <button onClick={resetGame} className="p-3 bg-white border border-daylight-border text-daylight-subtle rounded-full hover:border-red-300 hover:text-red-500 transition-colors">
               <RotateCcw size={20} />
            </button>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {Array.from({ length: state.totalTeams }).map((_, idx) => {
             const teamId = idx + 1;
             const teamUsers = state.users.filter(u => u.teamId === teamId);
             const allReady = teamUsers.length > 0 && teamUsers.every(u => u.isReady);
             const allMatchReady = teamUsers.length > 0 && teamUsers.every(u => u.isMatchReady);

             return (
               <div key={teamId} className="bg-white p-6 rounded-2xl shadow-sm border border-daylight-border">
                  <div className="flex justify-between items-center mb-4 border-b border-daylight-border pb-2">
                    <h3 className="font-serif font-bold text-xl text-daylight-text">Team {teamId}</h3>
                    {state.status === 'PLAYING' && allReady && <CheckCircle size={20} className="text-green-600"/>}
                    {state.status === 'MATCHING' && allMatchReady && <CheckCircle size={20} className="text-daylight-accent"/>}
                  </div>
                  <ul className="space-y-3">
                    {teamUsers.length === 0 ? <li className="text-sm text-daylight-subtle italic font-serif">Empty</li> : 
                      teamUsers.map(u => (
                        <li key={u.id} className="flex items-center justify-between text-sm bg-daylight-bg px-4 py-3 rounded-xl border border-transparent">
                           <span className="font-medium text-daylight-text">{u.name}</span>
                           <div className="flex gap-1">
                              {state.status === 'PLAYING' && (
                                <span className={`w-2.5 h-2.5 rounded-full ${u.isReady ? 'bg-green-500' : 'bg-daylight-border'}`}></span>
                              )}
                              {state.status === 'MATCHING' && (
                                <span className={`w-2.5 h-2.5 rounded-full ${u.isMatchReady ? 'bg-daylight-accent' : 'bg-daylight-border'}`}></span>
                              )}
                           </div>
                        </li>
                      ))
                    }
                  </ul>
                  {state.status === 'RESULTS' && (
                     <div className="mt-4 pt-4 border-t border-daylight-border text-right">
                        <span className="text-xs font-bold text-daylight-subtle uppercase tracking-widest mr-2">Total Score</span>
                        <span className="font-serif font-bold text-2xl text-daylight-accent">{teamUsers.reduce((acc, u) => acc + u.score, 0)}</span>
                     </div>
                  )}
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};