const kBaseURL = 'https://gitlab.com/api/v4/projects/19915911';

export const config = {
  baseURL: kBaseURL,
  fetchConfig: {
    baseURL: kBaseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Private-Token xyz',
    },
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
    system: [],
  },
  // Condition, default is closed issues
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
