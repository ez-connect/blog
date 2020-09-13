import { Issue, Label, ServiceConfig, User } from '~/models';

import { QueryParams } from './query';
import { Rest } from './Rest';

class Service {
  // Service config for each repo
  private _config?: ServiceConfig;

  // Caching one issue of specific labels
  private _issue: { [key: string]: Issue } = {};

  public init(value: ServiceConfig) {
    this._issue = {};
    this._config = value;
  }

  ///////////////////////////////////////////////////////////////////

  public signIn(clientId: string, directUri: string) {
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${directUri}`;
    window.open(url);
  }

  public async findOneUser(username: string): Promise<User> {
    return await Rest.get<User>(`https://api.github.com/users/${username}`);
  }

  ///////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////

  public async findIssues(params?: QueryParams): Promise<Issue[]> {
    Object.assign(params, this._config.queryParams);
    const items = await Rest.get<Issue[]>('/issues', { params });
    for (const e of items) {
      e.labels = this._removeSpecificLabel(e.labels);
    }

    return items;
  }

  public async findIssuesByLabel(
    value: string,
    params?: QueryParams,
  ): Promise<Issue[]> {
    params = { ...params, labels: value };
    Object.assign(params, this._config.queryParams);
    return this.findIssues(params);
  }

  public async findPinPosts(params?: QueryParams): Promise<Issue[]> {
    const { post, pin } = this._config.labels;
    params = { ...params, labels: [post, pin].join(',') };
    return this.findIssuesByLabel(this._config.labels.pin, params);
  }

  public async findPosts(params?: QueryParams): Promise<Issue[]> {
    params = { ...params, labels: this._config.labels.post };
    return this.findIssuesByLabel(this._config.labels.pin, params);
  }

  public async findPostsByLabel(
    value: string,
    params?: QueryParams,
  ): Promise<Issue[]> {
    params = { ...params, labels: [value, this._config.labels.post].join(',') };
    return this.findIssuesByLabel(this._config.labels.pin, params);
  }

  ///////////////////////////////////////////////////////////////////

  public async findOneIssue(number: number): Promise<Issue> {
    const item = await Rest.get<Issue>(`/issues/${number}`);
    item.labels = this._removeSpecificLabel(item.labels);
    return item;
  }

  public async findOneIssuesByLabel(value: string): Promise<Issue> {
    if (!this._issue.hasOwnProperty(value)) {
      const items = await this.findIssuesByLabel(value);
      if (items.length > 0) {
        this._issue[value] = items[0];
      } else {
        throw Error(`Not found: ${value}`);
      }
    }

    return this._issue[value];
  }

  public async findNav(): Promise<Issue> {
    return this.findOneIssuesByLabel(this._config.labels.nav);
  }

  public async findHeader(): Promise<Issue> {
    return this.findOneIssuesByLabel(this._config.labels.header);
  }

  public async findFooter(): Promise<Issue> {
    return this.findOneIssuesByLabel(this._config.labels.footer);
  }

  public async findTag(): Promise<Issue> {
    return this.findOneIssuesByLabel(this._config.labels.tags);
  }

  ///////////////////////////////////////////////////////////////////

  private _removeSpecificLabel(value: Label[]): Label[] {
    return value.filter((e) => !this._config.labels.hasOwnProperty(e.name));
  }
}

const singleton = new Service();
export { singleton as Service };
