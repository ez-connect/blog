import { Issue } from '~/models';

import { QueryParams } from './query';
import { ServiceBase } from './ServiceBase';

class Service extends ServiceBase {
  public async findNav(): Promise<Issue> {
    return this.findOneIssuesByLabel(this.config.labels.nav);
  }

  public async findHeader(): Promise<Issue> {
    return this.findOneIssuesByLabel(this.config.labels.header);
  }

  public async findFooter(): Promise<Issue> {
    return this.findOneIssuesByLabel(this.config.labels.footer);
  }

  public async findTag(): Promise<Issue> {
    return this.findOneIssuesByLabel(this.config.labels.tags);
  }

  public async findPosts(params?: QueryParams): Promise<Issue[]> {
    return this.findIssuesByLabel(this.config.labels.post, params);
  }

  public async findPostsByLabel(
    value: string,
    params?: QueryParams,
  ): Promise<Issue[]> {
    params = { ...params, labels: [value, this.config.labels.post].join(',') };
    return this.findIssuesByLabel(this.config.labels.pin, params);
  }

  public async findPinPosts(params?: QueryParams): Promise<Issue[]> {
    return this.findPostsByLabel(this.config.labels.pin, params);
  }

  public async findOnePost(id: number): Promise<Issue> {
    return this.findOneIssue(id);
  }
}

const singleton = new Service();
export { singleton as Service };
