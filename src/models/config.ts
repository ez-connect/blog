import { AxiosRequestConfig } from 'axios';

export interface ServiceConfig {
  name: 'GitHub' | 'GitLab';
  baseURL: string;
  webBaseURL: string;
  rest?: AxiosRequestConfig;
  authorization?: {
    clientId: string;
    clientSecret: string;
    directUri: string;
  };

  // Addition query params as default
  queryParams?: { [name: string]: any };

  // Specific label for data type, can change to match your labels
  labels: {
    nav: string;
    header: string;
    footer: string;
    // Describe all available tags
    tags: string;
    post: string;
    pin: string;
  };
}

export interface Config {
  // API service
  service: ServiceConfig;

  // Routes
  router: { [name: string]: string };
}
