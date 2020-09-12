import { AxiosRequestConfig } from 'axios';

export interface Config {
  baseURL: string;
  fetchConfig?: AxiosRequestConfig;
  authorization?: {
    clientId: string;
    directUri: string;
  };
  labels: {
    // Specific label for data type, can change to match your labels
    data: {
      nav: string;
      header: string;
      footer: string;
      single: string;
      post: string;
      pin: string;
    };
    // System labels, or labels will be not a post's tags.
    system: string[];
  };
  // Condition for fetching issues, default is closed issues
  condition?: { [name: string]: any };
  // Routes
  router: { [name: string]: string };
}
