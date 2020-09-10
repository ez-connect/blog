import { config } from '~/constants';
import { Issue, Label, User } from '~/models';

import { Rest } from './Rest';

export interface IssueParams {
  // Indicates the state of the issues to return. Can be either open, closed, or all.
  state?: 'open' | 'closed' | 'all';
  // The user that created the issue
  creator?: string;
  // A list of comma separated label names. Example: bug,ui,@high
  labels?: string;
  // What to sort results by. Can be either created, updated, comments.
  sort?: 'created' | 'updated' | 'comments';
  // The direction of the sort. Can be either asc or desc.
  direction?: 'asc' | 'desc';

  // Only issues updated at or after this time are returned.
  // This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  since?: string;

  // Results per page (max 100)
  per_page?: number;
  // Page number of the results to fetch
  page?: number;
}

class GitHub {
  public async findOneUser(username: string): Promise<User> {
    return await Rest.get<User>(`https://api.github.com/users/${username}`);
  }

  public async findLabels(): Promise<Label[]> {
    const items = await Rest.get<Label[]>('labels');
    return this._removeSpecificLabel(items);
  }

  public async countIssuesByLabel(value: string): Promise<number> {
    // const labels = [config.specicalLabel.post, value].join(',');
    const params: IssueParams = { labels: value, per_page: 1 };
    const items = await Rest.get<Issue[]>('/issues', { params });
    if (items.length > 0) {
      return items[0].number;
    }

    return 0;
  }

  public async findIssues(params?: IssueParams): Promise<Issue[]> {
    const items = await Rest.get<Issue[]>('/issues', { params });
    for (const e of items) {
      e.labels = this._removeSpecificLabel(e.labels);
    }

    console.warn(items);
    return items;
  }

  public async findOneIssue(number: number): Promise<Issue> {
    const item = await Rest.get<Issue>(`/issues/${number}`);
    item.labels = this._removeSpecificLabel(item.labels);
    return item;
  }

  private _removeSpecificLabel(value: Label[]): Label[] {
    return value.filter((e) => !config.specicalLabel.hasOwnProperty(e.name));
  }
}

const singleton = new GitHub();
export { singleton as GitHub };
