import { Issue, Label, ServiceConfig, User } from '~/models';

import { GitHubQueryParams, GitLabQueryParams, QueryParams } from './query';
import { QueryBuilder } from './QueryBuilder';
import { Rest } from './Rest';

export class ServiceBase {
  // Service config for each repo
  protected config?: ServiceConfig;

  // Caching one issue of specific labels
  protected issue: { [key: string]: Issue } = {};

  // Caching all labels
  protected labels: Label[] = [];

  public init(value: ServiceConfig) {
    // Reset cache
    this.issue = {};
    this.labels = [];

    // Assign new config
    this.config = value;
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

  protected async findLabels(): Promise<Label[]> {
    const { name, rest } = this.config;
    if (name === 'GitLab' && !rest.auth) {
      throw Error('Authorization required');
    }

    if (this.labels.length === 0) {
      const items = await Rest.get<Label[]>('labels');
      this.labels = this._removeSpecificLabel(items);
    }

    return this.labels;
  }

  protected async findOneLabel(value: string): Promise<Label> {
    const { name, rest } = this.config;
    if (name === 'GitLab' && !rest.auth) {
      return { name: value };
    }

    return Rest.get<Label>(`labels/${value}`);
  }

  protected async countIssuesByLabel(value: string): Promise<number> {
    const params = this._buildParams({ labels: value, size: 1 });
    const items = await Rest.get<Issue[]>('/issues', { params });
    if (items.length > 0) {
      return items[0].number;
    }

    return 0;
  }

  ///////////////////////////////////////////////////////////////////

  protected async findIssues(params?: QueryParams): Promise<Issue[]> {
    Object.assign(params, this.config.queryParams);
    const items = await Rest.get<Issue[]>('/issues', {
      params: this._buildParams(params),
    });
    for (const e of items) {
      this._convertToGitHubIssue(e);
      e.labels = this._removeSpecificLabel(e.labels);
    }

    // GitLab has label name only
    // Assign full for compatible with GitHub
    if (this.config.name === 'GitLab') {
      for (const e of items) {
        const names: string[] = e.labels as any;
        e.labels = names.map((name) => ({
          name,
        }));
      }
    }

    return items;
  }

  protected async findIssuesByLabel(
    value: string,
    params?: QueryParams,
  ): Promise<Issue[]> {
    params = { ...params, labels: value };
    Object.assign(params, this.config.queryParams);
    return this.findIssues(params);
  }

  ///////////////////////////////////////////////////////////////////

  protected async findOneIssue(number: number): Promise<Issue> {
    const item = await Rest.get<Issue>(`/issues/${number}`);
    this._convertToGitHubIssue(item);
    item.labels = this._removeSpecificLabel(item.labels);
    return item;
  }

  protected async findOneIssuesByLabel(value: string): Promise<Issue> {
    if (!this.issue.hasOwnProperty(value)) {
      const items = await this.findIssuesByLabel(value);
      if (items.length > 0) {
        const item = items[0];
        this.issue[value] = item;
      } else {
        throw Error(`Not found: ${value}`);
      }
    }

    return this.issue[value];
  }

  ///////////////////////////////////////////////////////////////////

  private _buildParams(
    params?: QueryParams,
  ): GitHubQueryParams | GitLabQueryParams {
    return this.config.name === 'GitHub'
      ? QueryBuilder.getGitHub(params)
      : QueryBuilder.getGitLab(params);
  }

  // The same format as GitHub
  private _convertToGitHubIssue(value: Issue) {
    value.id = value.number ?? value.iid;

    if (this.config.name === 'GitLab') {
      value.body = value.description;
      value.user = value.author;

      value.body = value.description.replaceAll(
        /!?\[.*\]\((\/uploads.*\/.*\))/g,
        '$1' + this.config.webBaseURL + '$2',
      );
    }

    return value;
  }

  private _removeSpecificLabel(value: Label[]): Label[] {
    return value.filter((e) => !this.config.labels.hasOwnProperty(e.name));
  }
}
