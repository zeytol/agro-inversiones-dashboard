// user.model.ts
export interface User {
  id: number;
  created_at: string | null;
  email: string;
  enabled: number;
  password: string;
  username: string;
}