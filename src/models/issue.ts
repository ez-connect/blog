import { Label } from './label';
import { User } from './user';

export interface Issue {
  id: number;
  number: number;
  html_url: string;
  title: string;
  labels: Label[];
  body: string;
  state: 'open' | 'closed';
  user: User;
  created_at: string;
  updated_at: string;
}
