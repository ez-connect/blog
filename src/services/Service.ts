import { Issue, Label, ServiceConfig, User } from '~/models';

import { Rest } from './Rest';

interface QueryParams {
  // Indicates the state of the issues to return. Can be either open, closed, or all.
  state?: 'open' | 'closed' | 'all';
  // The user that created the issue
  creator?: string;
  // A list of comma separated label names. Example: bug,ui,@high
  labels?: string;

  // GitLab
  label?: string;

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

class Service {
  private _config?: ServiceConfig;

  public init(value: ServiceConfig) {
    this._config = value;
  }

  public signIn(clientId: string, directUri: string) {
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${directUri}`;
    window.open(url);
  }

  public async findOneUser(username: string): Promise<User> {
    return await Rest.get<User>(`https://api.github.com/users/${username}`);
  }

  public async findLabels(): Promise<Label[]> {
    const items = await Rest.get<Label[]>('labels');
    return this._removeSpecificLabel(items);
  }

  public async findOneLabel(name: string): Promise<Label> {
    return Rest.get<Label>(`labels/${name}`);
  }

  public async countIssuesByLabel(value: string): Promise<number> {
    // const labels = [this._config.labels.data.post, value].join(',');
    const params: QueryParams = { labels: value, per_page: 1 };
    const items = await Rest.get<Issue[]>('/issues', { params });
    if (items.length > 0) {
      return items[0].number;
    }

    return 0;
  }

  public async findIssues(params?: QueryParams): Promise<Issue[]> {
    if (this._config.condition) {
      Object.assign(params, this._config.condition);
    }

    const items = await Rest.get<Issue[]>('/issues', { params });
    for (const e of items) {
      e.labels = this._removeSpecificLabel(e.labels);
    }

    return items;
  }

  public async findIssuesByLabel(value: string): Promise<Issue[]> {
    const params =
      this._config.name === 'GitHub' ? { labels: value } : { label: value };
    Object.assign(params, this._config.condition);
    return this.findIssues(params);
  }

  public async findOneIssue(number: number): Promise<Issue> {
    const item = await Rest.get<Issue>(`/issues/${number}`);
    item.labels = this._removeSpecificLabel(item.labels);
    return item;
  }

  private _removeSpecificLabel(value: Label[]): Label[] {
    return value.filter(
      (e) => !this._config.systemLabels.hasOwnProperty(e.name),
    );
  }
}

const singleton = new Service();
export { singleton as Service };
