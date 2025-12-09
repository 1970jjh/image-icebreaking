import { useState, useEffect } from 'react';
import { GameState, INITIAL_GAME_STATE, User } from '../types';

const STORAGE_KEY = 'visual_metaphor_game_state';

// Helper to get state
export const getGameState = (): GameState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : INITIAL_GAME_STATE;
};

// Helper to set state
export const setGameState = (newState: GameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  // Dispatch a custom event for the same window
  window.dispatchEvent(new Event('game-state-changed'));
};

// React Hook for real-time updates across tabs
export const useGameState = () => {
  const [state, setState] = useState<GameState>(getGameState());

  useEffect(() => {
    const handleStorageChange = () => {
      setState(getGameState());
    };

    // Listen for storage events (other tabs)
    window.addEventListener('storage', handleStorageChange);
    // Listen for local events (same tab)
    window.addEventListener('game-state-changed', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('game-state-changed', handleStorageChange);
    };
  }, []);

  return {
    state,
    updateState: (updater: (prev: GameState) => GameState) => {
      const newState = updater(getGameState());
      setGameState(newState);
    },
    resetGame: () => setGameState(INITIAL_GAME_STATE)
  };
};

export const joinGame = (name: string, teamId: number): User => {
  const currentState = getGameState();
  // Check if user exists
  const existingUser = currentState.users.find(u => u.name === name && u.teamId === teamId);
  if (existingUser) return existingUser;

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    teamId,
    selections: { 0: null, 1: null, 2: null },
    guesses: {},
    score: 0,
    isReady: false,
    isMatchReady: false
  };

  setGameState({
    ...currentState,
    users: [...currentState.users, newUser]
  });

  return newUser;
};