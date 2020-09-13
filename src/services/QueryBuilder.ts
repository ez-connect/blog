import { GitHubQueryParams, GitLabQueryParams, QueryParams } from './query';

class QueryBuilder {
  public getGitHub(params?: QueryParams): GitHubQueryParams {
    const { state, author, labels, sort, order, since, size, page } = params;
    return {
      state: state === 'opened' ? 'open' : state,
      creator: author,
      labels,
      sort,
      direction: order,
      since,
      per_page: size,
      page,
    };
  }

  public getGitLab(params?: QueryParams): GitLabQueryParams {
    const { state, author, labels, sort, order, since, size, page } = params;
    return {
      state: state,
      author_username: author,
      labels,
      sort: order,
      order_by:
        sort === 'updated'
          ? 'updated_at'
          : sort === 'created'
          ? 'created_at'
          : undefined,
      updated_after: since,
      per_page: size,
      page,
    };
  }
}

const singleton = new QueryBuilder();
export { singleton as QueryBuilder };
