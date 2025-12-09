
export interface ImageCard {
  id: string;
  keyword: string;
  label: string;
  category: string;
}

export type SelectionState = { [promptId: number]: ImageCard | null };

export type GameStatus = 'SETUP' | 'WAITING' | 'PLAYING' | 'MATCHING' | 'RESULTS';

export interface Prompt {
  id: number;
  text: string;
}

export interface User {
  id: string;
  name: string;
  teamId: number;
  selections: SelectionState;
  guesses: { 
    [promptId: number]: { 
      [targetUserId: string]: string | null // guessing which card belongs to whom. cardId -> userId
    } 
  };
  score: number;
  isReady: boolean; // For selection phase
  isMatchReady: boolean; // For matching phase
}

export interface GameState {
  orgName: string;
  totalTeams: number;
  prompts: Prompt[];
  status: GameStatus;
  users: User[];
  revealResults: boolean;
}

export const ADMIN_PASSWORD = "6749467";

export const INITIAL_GAME_STATE: GameState = {
  orgName: "",
  totalTeams: 2,
  prompts: [
    { id: 0, text: "나를 잘 나타내는 이미지는?" },
    { id: 1, text: "내가 생각하는 우리 팀의 강점은?" },
    { id: 2, text: "오늘 워크숍에서 얻고 싶은 것은?" },
  ],
  status: 'SETUP',
  users: [],
  revealResults: false,
};
