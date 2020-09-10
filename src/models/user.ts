export interface User {
  id: number;
  avatar_url: string;
  name?: string;

  login?: string; // GitHub
  username?: string; // GitLab
}
