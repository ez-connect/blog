export interface GitHubQueryParams {
  // Indicates the state of the issues to return. Can be either open, closed, or all.
  state?: 'open' | 'closed' | 'all';
  // The user that created the issue
  creator?: string;
  // A list of comma separated label names. Example: bug,ui,@high
  labels?: string;

  // What to sort results by. Can be either created, updated, comments.
  sort?: 'created' | 'updated';
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

export interface GitLabQueryParams {
  // Indicates the state of the issues to return. Can be either open, closed, or all.
  state?: 'opened' | 'closed' | 'all';
  // The user that created the issue
  author_username?: string;
  // A list of comma separated label names. Example: bug,ui,@high
  labels?: string;

  // Return issues sorted in asc or desc order, default is desc
  sort?: 'asc' | 'desc';
  // The direction of the sort. Can be either asc or desc.
  order_by?: 'created_at' | 'updated_at';

  // Only issues updated at or after this time are returned.
  // This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  updated_after?: string;

  // Results per page (max 100)
  per_page?: number;
  // Page number of the results to fetch
  page?: number;
}

export interface QueryParams {
  // Indicates the state of the issues to return. Can be either open, closed, or all.
  state?: 'opened' | 'closed' | 'all';
  // The user that created the issue
  author?: string;
  // A list of comma separated label names. Example: bug,ui,@high
  labels?: string;

  // What to sort results by. Can be either created, updated, comments.
  // GitLab: asc | desc
  sort?: 'created' | 'updated';

  // The direction of the sort. Can be either asc or desc.
  order?: 'asc' | 'desc';

  // Only issues updated at or after this time are returned.
  // This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  since?: string;

  // Results per page (max 100)
  size?: number;
  // Page number of the results to fetch
  page?: number;
}
