import { Config } from '~/models';

const kBaseURL = 'https://gitlab.com/api/v4/projects/21093243';

export const config: Config = {
  service: {
    name: 'GitLab',
    baseURL: kBaseURL,
    webBaseURL: 'https://gitlab.com/ez-connect/blog',
    rest: {
      baseURL: kBaseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        // 'Private-Token': 'blah blah blah',
      },
    },
    authorization: {
      clientId:
        'af1aa7768f5337f58aa7eb9eb9ac864a84f99ddad53790b34fef1cd938bf6f23',
      directUri: 'http://localhost:3000/auth',
    },
    // condition: {
    //   state: 'closed',
    // },
    labels: {
      nav: 'nav',
      header: 'header',
      footer: 'footer',
      tags: 'tags',
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
