export enum GameState {
  Preparation = "Preparation",
  Progress = "Progress",
  Completion = "Completion",
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export interface LobbyProfile {
  id: string;
  name: string;
  description: string;
  status: GameState;
  host: UserProfile;
  participants: UserProfile[];
}
