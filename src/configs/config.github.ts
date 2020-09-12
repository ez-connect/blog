import { Config } from '~/models';

const kBaseURL = 'https://api.github.com/repos/ez-connect/blog';

export const config: Config = {
  baseURL: kBaseURL,
  fetchConfig: {
    baseURL: kBaseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token 7605d0407d6cffa76e024a178b1fe9cf1d479ec0',
    },
  },
  authorization: {
    clientId: '1018088c847a3f5328f5',
    directUri: 'http://localhost:3000/auth',
  },
  labels: {
    data: {
      nav: 'nav',
      header: 'header',
      footer: 'footer',
      single: 'single',
      post: 'post',
      pin: 'pin',
    },
    system: [
      'documentation',
      'duplicate',
      'enhancement',
      'good first issue',
      'help wanted',
      'invalid',
      'question',
      'wontfix',
    ],
  },
  condition: {
    state: 'closed',
  },
  router: {
    home: '/',
    about: '/about',
    tags: '/tags',
    posts: '/posts',
    users: '/users',
  },
};
