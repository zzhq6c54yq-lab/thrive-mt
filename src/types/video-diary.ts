
export interface VideoEntry {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export interface MemorialEntry {
  id: string;
  name: string;
  dates: string;
  image: string;
  message: string;
  flowers: number;
  messages: number;
  createdBy?: string;
  createdAt?: string;
  tags?: string[];
}

export interface MemorialComment {
  id: string;
  memorialId: string;
  name: string;
  date: string;
  text: string;
  userImage?: string;
}
