export interface Comment {
  id: number;
  name: string;
  profileurl: string;
  date: string;
  content: string;
  likes: number;
  responses: Comment[];
}
