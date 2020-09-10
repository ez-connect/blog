import { Label } from './label';
import { User } from './user';

export interface Issue {
  id: number;

  number?: number; // GitHub
  iid?: number; // GitHub

  title: string;
  labels: Label[];

  body?: string; // GitHub
  description?: string; // GitLab

  state: 'open' | 'closed';

  user: User; // GitHub
  author: User; // GitLab

  created_at: string;
  updated_at: string;
}
