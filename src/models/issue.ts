import { Label } from './label';

export interface Issue {
  id: number;
  html_url: string;
  title: string;
  labels: Label[];
  body: string;
}
