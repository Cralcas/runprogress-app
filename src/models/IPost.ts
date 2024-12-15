export interface PostCreate {
  title: string;
  description: string | null;
  distance: number;
  pace: string | null;
  time: string;
  shoe: string | null;
}
