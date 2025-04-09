
export interface Movie {
  id?: string;
  title: string;
  poster?: string;
  year?: number;
  description?: string;
  type?: string;
  thumbsUp?: number;
  thumbsDown?: number;
  likedBy?: string[];
  dislikedBy?: string[];
}