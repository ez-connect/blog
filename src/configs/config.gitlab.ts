import { Config } from '~/models';

const kBaseURL = 'https://gitlab.com/api/v4/projects/21093243';

export const config: Config = {
  service: {
    name: 'GitLab',
    baseURL: kBaseURL,
    rest: {
      baseURL: kBaseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        // 'Private-Token': 'blah blah blah',
      },
    },
    authorization: {
      clientId: '1018088c847a3f5328f5',
      directUri: 'http://localhost:3000/auth',
    },
    // condition: {
    //   state: 'closed',
    // },
    labels: {
      nav: 'nav',
      header: 'header',
      footer: 'footer',
      tags: 'tag',
      post: 'post',
      pin: 'pin',
    },
  },
  router: {
    home: '/',
    about: '/about',
    tags: '/tags',
    posts: '/posts',
    users: '/users',
  },
};
