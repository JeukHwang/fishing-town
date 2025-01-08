interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  sender: UserProfile;
  text: string;
  date: Date;
}
