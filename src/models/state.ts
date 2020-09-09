import { Issue } from './issue';
import { User } from './user';

export interface IssueProps {
  item?: Issue;
}

export interface IssueState {
  item?: Issue;
}

export interface UserState {
  user?: User;
}
