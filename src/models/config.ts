import { AxiosRequestConfig } from 'axios';

export interface ServiceConfig {
  name: 'GitHub' | 'GitLab';
  baseURL: string;
  rest?: AxiosRequestConfig;
  authorization?: {
    clientId: string;
    directUri: string;
  };

  // System labels, or labels will be not a post's tags.
  systemLabels: string[];

  // Condition for fetching issues, default is closed issues
  condition?: { [name: string]: any };
}

export interface Config {
  service: ServiceConfig;

  // Specific label for data type, can change to match your labels
  labels: {
    nav: string;
    header: string;
    footer: string;
    post: string;
    pin: string;
  };

  // Routes
  router: { [name: string]: string };
}
