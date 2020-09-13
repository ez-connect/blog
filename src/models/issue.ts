import { Label } from './label';
import { User } from './user';

export interface Issue {
  id: number; // will use number or iid instead of id

  number?: number; // GitHub
  iid?: number; // GitHub

  title: string;
  labels: Label[];

  body: string; // GitHub, will use as default
  description?: string; // GitLab

  state: 'open' | 'closed';

  user: User; // GitHub, will use as default
  author?: User; // GitLab

  created_at: string;
  updated_at: string;
}
