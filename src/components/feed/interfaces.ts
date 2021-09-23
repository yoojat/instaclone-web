// export interface CommentProps {
//   id?: number;
//   photoId?: number;
//   isMine?: boolean;
//   author: string;
//   payload: string;
//   user: {
//     avatar?: string;
//     username: string;
//   };
// }

export interface CommentProps {
  id: number;
  payload: string;
  isMine: boolean;
  createdAt?: string | null;
  user: { username: string; avatar?: string | null };
}
