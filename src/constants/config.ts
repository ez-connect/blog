const kBaseURL = 'https://api.github.com/repos/ez-connect/blog';

export const config = {
  baseURL: kBaseURL,
  fetchConfig: {
    baseURL: kBaseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token 7605d0407d6cffa76e024a178b1fe9cf1d479ec0',
    },
  },
  specicalLabel: {
    // Specific label for data type, can change to match your labels
    nav: 'nav',
    header: 'header',
    footer: 'footer',
    single: 'single',
    post: 'post',
    pin: 'pin',

    // System labels, or labels will be hidden
    documentation: 'documentation',
    duplicate: 'duplicate',
    enhancement: 'enhancement',
    'good first issue': 'good first issue',
    'help wanted': 'help wanted',
    invalid: 'invalid',
    question: 'question',
    wontfix: 'wontfix',
  },
  // Condition, default is closed issues
  condition: {
    state: 'closed',
  },
  router: {
    home: '/',
    signIn: '/sign-in',
    about: '/about',
    tags: '/tags',
    posts: '/posts',
    users: '/users',
  },
};
