export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export interface LobbyProfile {
  id: string;
  name: string;
  description: string;
  host: UserProfile;
  participants: UserProfile[];
}
