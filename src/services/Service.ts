import { Issue, Label, ServiceConfig, User } from '~/models';

import { GitHubQueryParams, GitLabQueryParams, QueryParams } from './query';
import { QueryBuilder } from './QueryBuilder';
import { Rest } from './Rest';

class Service {
  // Service config for each repo
  private _config?: ServiceConfig;

  // Caching one issue of specific labels
  private _issue: { [key: string]: Issue } = {};

  // Caching all labels
  private _labels: Label[] = [];

  public init(value: ServiceConfig) {
    // Reset cache
    this._issue = {};
    this._labels = [];

    // Assign new config
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
    if (this._labels.length === 0) {
      const items = await Rest.get<Label[]>('labels');
      this._labels = this._removeSpecificLabel(items);
    }

    return this._labels;
  }

  public async findOneLabel(name: string): Promise<Label> {
    return Rest.get<Label>(`labels/${name}`);
  }

  public async countIssuesByLabel(value: string): Promise<number> {
    const params = this._buildParams({ labels: value, size: 1 });
    const items = await Rest.get<Issue[]>('/issues', { params });
    if (items.length > 0) {
      return items[0].number;
    }

    return 0;
  }

  ///////////////////////////////////////////////////////////////////

  public async findIssues(params?: QueryParams): Promise<Issue[]> {
    Object.assign(params, this._config.queryParams);
    const items = await Rest.get<Issue[]>('/issues', {
      params: this._buildParams(params),
    });
    for (const e of items) {
      e.labels = this._removeSpecificLabel(e.labels);
    }

    // GitLab has label name only
    // Assign full for compatible with GitHub
    if (this._config.name === 'GitLab' && this._labels.length === 0) {
      const labels = await this.findLabels();
      for (const item of items) {
        const names: string[] = item.labels as any;
        item.labels = labels.filter((e) => names.includes(e.name));
      }
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

  private _buildParams(
    params?: QueryParams,
  ): GitHubQueryParams | GitLabQueryParams {
    return this._config.name === 'GitLab'
      ? QueryBuilder.getGitHub(params)
      : QueryBuilder.getGitLab(params);
  }

  private _removeSpecificLabel(value: Label[]): Label[] {
    return value.filter((e) => !this._config.labels.hasOwnProperty(e.name));
  }
}

const singleton = new Service();
export { singleton as Service };
