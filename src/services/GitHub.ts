
import { User } from '~/models';

import { Rest } from './Rest';

export interface IssueParams {
  // Indicates the state of the issues to return. Can be either open, closed, or all.
  state?: 'open' | 'closed' | 'all';
  // The user that created the issue
  creator?: string;
  // A list of comma separated label names. Example: bug,ui,@high
  labels?: string;
  // What to sort results by. Can be either created, updated, comments.
  sort: 'created' | 'updated' | 'comments';
  // The direction of the sort. Can be either asc or desc.
  direction: 'asc' | 'desc';

  // Only issues updated at or after this time are returned.
  // This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  since: string;

  // Results per page (max 100)
  per_page: number;
}

class GitHub {
  public async findOneUser(username: string): Promise<User> {
    return await Rest.get<User>(`https://api.github.com/users/${username}`);
  }

  public async findIssues(): Promise<Issue[]> {
    return await Rest.get<Issue[]>('/issues');
  }

  public async findOneIssues(id: number): Promise<Issue> {
    return await Rest.get<Issue>(`/issues/${id}`);
  }
}

const singleton = new GitHub();
export { singleton as GitHub };
