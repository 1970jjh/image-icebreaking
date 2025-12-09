import React, { useState, useEffect } from 'react';
import { useGameState, joinGame } from '../services/gameStore';
import { User, GameStatus, ImageCard } from '../types';
import { IMAGE_CARDS } from '../constants';
import { ImageGrid } from './ImageGrid';
import { CheckCircle, Loader2, Trophy, ArrowRight, X, Maximize2 } from 'lucide-react';

export const UserGame: React.FC = () => {
  const { state, updateState } = useGameState();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [joinName, setJoinName] = useState('');
  const [joinTeam, setJoinTeam] = useState(1);
  
  // New States for Features
  const [imageSeed, setImageSeed] = useState<number>(1);
  const [viewingImage, setViewingImage] = useState<ImageCard | null>(null);

  // Sync current user state from global state
  useEffect(() => {
    if (currentUser) {
      const syncedUser = state.users.find(u => u.id === currentUser.id);
      if (syncedUser) setCurrentUser(syncedUser);
    }
  }, [state.users]);

  // Handle Joining
  const handleJoin = () => {
    if (!joinName.trim()) return alert("이름을 입력해주세요.");
    const user = joinGame(joinName, joinTeam);
    setCurrentUser(user);
    sessionStorage.setItem('game_user_id', user.id);
  };

  const handleRefreshImages = () => {
    setImageSeed(prev => prev + 1);
  };

  // ---------------- VIEW: JOIN ----------------
  if (!currentUser) {
    if (state.status === 'SETUP') {
       return (
         <div className="h-full flex items-center justify-center p-6 text-center">
            <div className="space-y-4">
                <Loader2 className="animate-spin text-daylight-subtle mx-auto" size={32} />
                <h2 className="text-2xl font-serif text-daylight-subtle">Waiting for host to set up...</h2>
            </div>
         </div>
       );
    }

    return (
      <div className="h-full flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
        <div className="w-full max-w-md bg-white rounded-[32px] p-10 shadow-xl border border-daylight-border">
           <div className="text-center mb-10">
             <h1 className="text-3xl font-serif font-bold text-daylight-text mb-3">{state.orgName}</h1>
             <p className="text-daylight-subtle font-sans">Please enter your details to join.</p>
           </div>
           
           <div className="space-y-6">
             <div className="space-y-2">
               <label className="block text-sm font-bold text-daylight-text tracking-wide uppercase">Name</label>
               <input 
                 value={joinName} 
                 onChange={e => setJoinName(e.target.value)} 
                 className="w-full p-4 bg-daylight-bg rounded-xl border border-transparent focus:bg-white focus:border-daylight-accent focus:ring-0 transition-all font-serif text-lg placeholder:font-sans"
                 placeholder="Your Name"
               />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-bold text-daylight-text tracking-wide uppercase">Team</label>
               <select 
                 value={joinTeam} 
                 onChange={e => setJoinTeam(Number(e.target.value))}
                 className="w-full p-4 bg-daylight-bg rounded-xl border border-transparent focus:bg-white focus:border-daylight-accent focus:ring-0 outline-none font-serif text-lg appearance-none"
               >
                 {Array.from({ length: state.totalTeams }).map((_, i) => (
                   <option key={i+1} value={i+1}>Team {i+1}</option>
                 ))}
               </select>
             </div>
             <button onClick={handleJoin} className="w-full py-4 bg-daylight-text text-white font-sans font-medium rounded-full hover:bg-daylight-accent transition-colors shadow-lg mt-4">
               Join Session
             </button>
           </div>
        </div>
      </div>
    );
  }

  // ---------------- VIEW: WAITING ROOM ----------------
  if (state.status === 'WAITING') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
         <div className="w-24 h-24 border border-daylight-border rounded-full flex items-center justify-center mb-8 bg-white shadow-sm">
            <Loader2 className="animate-spin text-daylight-accent" size={32} />
         </div>
         <h2 className="text-4xl font-serif text-daylight-text mb-4">You're all set.</h2>
         <p className="text-daylight-subtle text-lg font-sans max-w-md mx-auto leading-relaxed">
           Please wait for the facilitator to begin the session.
         </p>
         <div className="mt-12 inline-block px-8 py-3 rounded-full border border-daylight-border bg-white text-daylight-text font-serif italic">
            {state.users.filter(u => u.teamId === currentUser.teamId).length} team members ready
         </div>
      </div>
    );
  }

  // ---------------- VIEW: SELECTION PHASE ----------------
  if (state.status === 'PLAYING') {
     
     // Only allow modal if the user is ready (confirmed) or if user wants to check before confirming?
     // Prompt said: "After selection confirmation, when clicking...". So we check currentUser.isReady.
     const canViewLarge = currentUser.isReady;

     const handleSelection = (card: ImageCard) => {
        if (currentUser.isReady) return; // Locked

        const currentSelections = currentUser.selections;
        let nextSlot = -1;
        if (!currentSelections[0]) nextSlot = 0;
        else if (!currentSelections[1]) nextSlot = 1;
        else if (!currentSelections[2]) nextSlot = 2;

        if (nextSlot !== -1) {
            updateUserSelection(nextSlot, card);
        } else {
            // Optional: Auto-replace the last one or show alert
            alert("Please remove a card first to add a new one.");
        }
     };

     const updateUserSelection = (slot: number, card: ImageCard | null) => {
        updateState(prev => ({
            ...prev,
            users: prev.users.map(u => 
                u.id === currentUser.id 
                ? { ...u, selections: { ...u.selections, [slot]: card } } 
                : u
            )
        }));
     };

     const submitSelection = () => {
        if (!currentUser.selections[0] || !currentUser.selections[1] || !currentUser.selections[2]) {
            return alert("Please select images for all 3 prompts.");
        }
        updateState(prev => ({
            ...prev,
            users: prev.users.map(u => u.id === currentUser.id ? { ...u, isReady: true } : u)
        }));
     };

     const handleCardClick = (promptId: number) => {
         const card = currentUser.selections[promptId];
         if (!card) return;

         if (canViewLarge) {
             setViewingImage(card);
         } else {
             updateUserSelection(promptId, null);
         }
     };

     return (
       <div className="flex flex-col h-full bg-daylight-bg">
         
         {/* Modal */}
         {viewingImage && (
             <div className="fixed inset-0 z-[100] bg-daylight-bg/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setViewingImage(null)}>
                 <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
                     <button className="absolute -top-12 right-0 text-daylight-text hover:text-daylight-accent transition-colors" onClick={() => setViewingImage(null)}>
                         <X size={32} strokeWidth={1.5} />
                     </button>
                     <img 
                        src={`https://loremflickr.com/1000/1000/${viewingImage.keyword}?lock=${viewingImage.id}-${imageSeed}`} 
                        className="rounded-lg shadow-2xl max-h-[80vh] object-contain border-8 border-white"
                        onClick={(e) => e.stopPropagation()}
                     />
                     <div className="mt-6 text-center bg-white px-8 py-3 rounded-full shadow-md border border-daylight-border">
                         <h3 className="text-2xl font-serif text-daylight-text">{viewingImage.label}</h3>
                     </div>
                 </div>
             </div>
         )}

         {/* Sticky Header */}
         <div className="bg-white/90 backdrop-blur-md border-b border-daylight-border z-10 sticky top-0 transition-shadow shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-6">
                
                {currentUser.isReady ? (
                    <div className="text-center py-4 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle className="text-green-600 mx-auto mb-3" size={40} />
                        <h2 className="text-2xl font-serif text-daylight-text mb-1">Selection Confirmed</h2>
                        <p className="text-daylight-subtle font-sans text-sm">Tap on your cards below to view them in full screen.</p>
                    </div>
                ) : (
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-daylight-text">Your Story</h2>
                            <p className="text-sm text-daylight-subtle font-sans">Select 3 images that answer the questions.</p>
                        </div>
                        <button 
                            onClick={submitSelection}
                            className={`px-8 py-3 rounded-full font-sans font-medium transition-all duration-300 ${
                                (currentUser.selections[0] && currentUser.selections[1] && currentUser.selections[2])
                                ? 'bg-daylight-text text-white hover:bg-daylight-accent hover:shadow-lg' 
                                : 'bg-daylight-bg text-daylight-subtle border border-daylight-border cursor-not-allowed'
                            }`}
                        >
                            Confirm Selection
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-3 md:gap-8">
                    {state.prompts.map((p, idx) => (
                        <div key={p.id} className="flex flex-col gap-3 group">
                            <div 
                                onClick={() => handleCardClick(p.id)}
                                className={`
                                    relative aspect-square rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-center justify-center bg-daylight-bg
                                    ${currentUser.selections[p.id] 
                                        ? 'border-transparent shadow-md group-hover:shadow-lg' 
                                        : 'border-dashed border-daylight-border group-hover:border-daylight-subtle group-hover:bg-white'}
                                `}
                            >
                                {currentUser.selections[p.id] ? (
                                    <>
                                        <img src={`https://loremflickr.com/400/400/${currentUser.selections[p.id]!.keyword}?lock=${currentUser.selections[p.id]!.id}-${imageSeed}`} className="absolute inset-0 w-full h-full object-cover filter sepia-[0.1]" />
                                        
                                        {/* Overlay Icon depending on state */}
                                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                                            {canViewLarge ? (
                                                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" size={32} />
                                            ) : (
                                                <X className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" size={32} />
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-4 text-center">
                                        <span className="text-xs font-bold text-daylight-subtle uppercase tracking-widest block mb-2">Question {idx+1}</span>
                                        <span className="text-sm md:text-base font-serif text-daylight-text leading-tight">{p.text}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
         
         {/* Image Grid Area */}
         {!currentUser.isReady ? (
            <div className="flex-1 overflow-y-auto bg-daylight-bg">
                <ImageGrid 
                    selections={currentUser.selections as any} 
                    onSelect={handleSelection} 
                    imageSeed={imageSeed}
                    onRefresh={handleRefreshImages}
                />
            </div>
         ) : (
             <div className="flex-1 flex items-center justify-center bg-daylight-bg text-daylight-subtle font-serif italic text-lg p-8 opacity-60">
                 Waiting for teammates to finish...
             </div>
         )}
       </div>
     );
  }

  // ---------------- VIEW: MATCHING PHASE ----------------
  if (state.status === 'MATCHING') {
      if (currentUser.isMatchReady) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
               <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle className="text-green-600" size={40} />
               </div>
               <h2 className="text-3xl font-serif text-daylight-text mb-2">Guesses Submitted</h2>
               <p className="text-daylight-subtle font-sans">Wait for the reveal.</p>
            </div>
        );
      }

      const teamMembers = state.users.filter(u => u.teamId === currentUser.teamId && u.id !== currentUser.id);
      
      const handleGuessChange = (promptId: number, cardId: string, targetUserId: string) => {
          updateState(prev => ({
              ...prev,
              users: prev.users.map(u => {
                  if (u.id !== currentUser.id) return u;
                  const newGuesses = { ...u.guesses };
                  if (!newGuesses[promptId]) newGuesses[promptId] = {};
                  newGuesses[promptId][cardId] = targetUserId;
                  return { ...u, guesses: newGuesses };
              })
          }));
      };

      const submitGuesses = () => {
         updateState(prev => ({
             ...prev,
             users: prev.users.map(u => u.id === currentUser.id ? { ...u, isMatchReady: true } : u)
         }));
      };

      return (
          <div className="h-full flex flex-col bg-daylight-bg overflow-hidden">
              <div className="bg-white/90 backdrop-blur border-b border-daylight-border p-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-daylight-text">Who chose what?</h2>
                    <p className="text-sm text-daylight-subtle font-sans">Match the cards to your teammates.</p>
                  </div>
                  <button onClick={submitGuesses} className="bg-daylight-text text-white px-8 py-3 rounded-full font-sans font-medium hover:bg-daylight-accent transition-colors shadow-md">
                      Submit Guesses
                  </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-16">
                  {state.prompts.map((prompt) => {
                      const teammateSelections = teamMembers.map(m => ({ user: m, card: m.selections[prompt.id] })).filter(item => item.card !== null);
                      
                      return (
                          <div key={prompt.id} className="max-w-5xl mx-auto">
                              <h3 className="text-2xl font-serif font-medium text-daylight-text mb-6 pb-2 border-b border-daylight-border/50">
                                  <span className="text-daylight-subtle mr-2 text-lg">Q{prompt.id + 1}</span> {prompt.text}
                              </h3>
                              
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                                  {teammateSelections.map(({ user, card }) => {
                                      const currentGuess = currentUser.guesses[prompt.id]?.[card!.id] || "";
                                      
                                      return (
                                          <div key={card!.id} className="flex flex-col gap-4 group">
                                              <div className="aspect-square rounded-xl overflow-hidden shadow-sm border border-daylight-border bg-white p-2">
                                                  <div className="w-full h-full overflow-hidden rounded-lg">
                                                    <img src={`https://loremflickr.com/400/400/${card!.keyword}?lock=${card!.id}-${imageSeed}`} className="w-full h-full object-cover filter sepia-[0.1]" />
                                                  </div>
                                              </div>
                                              <select 
                                                  className="w-full p-3 bg-white border border-daylight-border rounded-lg text-sm font-sans font-medium focus:border-daylight-accent outline-none shadow-sm"
                                                  value={currentGuess}
                                                  onChange={(e) => handleGuessChange(prompt.id, card!.id, e.target.value)}
                                              >
                                                  <option value="">Who is this?</option>
                                                  {teamMembers.map(tm => (
                                                      <option key={tm.id} value={tm.id}>{tm.name}</option>
                                                  ))}
                                              </select>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      );
  }

  // ---------------- VIEW: RESULTS PHASE ----------------
  if (state.status === 'RESULTS') {
      const teamMembers = state.users.filter(u => u.teamId === currentUser.teamId);

      return (
          <div className="h-full bg-daylight-bg overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto space-y-12">
                  <div className="text-center py-12 bg-white rounded-[32px] border border-daylight-border shadow-sm">
                      <Trophy className="text-daylight-accent mx-auto mb-4" size={48} strokeWidth={1.5} />
                      <h1 className="text-5xl font-serif font-bold text-daylight-text mb-4">Results</h1>
                      <div className="text-lg text-daylight-subtle font-sans">
                        Your Score: <span className="font-serif text-4xl text-daylight-accent font-bold ml-2">{currentUser.score}</span>
                      </div>
                  </div>

                  {/* Leaderboard */}
                  <div className="space-y-6">
                      <h3 className="text-2xl font-serif text-daylight-text px-4">Team Leaderboard</h3>
                      <div className="bg-white rounded-2xl border border-daylight-border overflow-hidden divide-y divide-daylight-border/50">
                          {teamMembers.sort((a, b) => b.score - a.score).map((member, idx) => (
                              <div key={member.id} className={`flex items-center justify-between p-6 ${member.id === currentUser.id ? 'bg-daylight-bg/50' : 'bg-white'}`}>
                                  <div className="flex items-center gap-6">
                                      <span className={`w-10 h-10 flex items-center justify-center rounded-full font-serif font-bold text-lg ${idx === 0 ? 'bg-daylight-accent text-white' : 'bg-daylight-border text-daylight-subtle'}`}>{idx + 1}</span>
                                      <span className="font-sans font-medium text-lg text-daylight-text">
                                          {member.name}
                                          {member.id === currentUser.id && <span className="ml-3 text-xs bg-daylight-text text-white px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">You</span>}
                                      </span>
                                  </div>
                                  <span className="font-serif font-bold text-xl text-daylight-text">{member.score} pts</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Reveal Answers */}
                  <div className="space-y-16 pt-8">
                      {state.prompts.map(prompt => (
                          <div key={prompt.id}>
                              <div className="flex items-baseline gap-4 mb-8 border-b border-daylight-border pb-4">
                                  <span className="text-daylight-subtle font-serif italic text-xl">Q{prompt.id+1}</span>
                                  <h4 className="text-3xl font-serif text-daylight-text">{prompt.text}</h4>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                  {teamMembers.map(member => (
                                      <div key={member.id} className="group relative">
                                          <div className="aspect-square rounded-xl overflow-hidden mb-4 relative shadow-sm border border-daylight-border bg-white p-2">
                                              <div className="w-full h-full overflow-hidden rounded-lg">
                                                 <img 
                                                  src={`https://loremflickr.com/400/400/${member.selections[prompt.id]?.keyword}?lock=${member.selections[prompt.id]?.id}-${imageSeed}`} 
                                                  className="w-full h-full object-cover filter sepia-[0.1]"
                                                 />
                                              </div>
                                              <div className="absolute inset-2 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">{member.selections[prompt.id]?.label}</span>
                                              </div>
                                          </div>
                                          <div className="text-center">
                                              <div className="font-serif font-bold text-lg text-daylight-text">{member.name}</div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  return <div>Loading...</div>;
};