const kBaseURL = 'https://api.github.com/repos/ez-connect/blog';

export const config = {
  baseURL: kBaseURL,
  fetchConfig: {
    baseURL: kBaseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  specicalLabel: {
    nav: 'nav',
    header: 'header',
    footer: 'footer',
    post: 'post',
    pin: 'pin',
  },
  router: {
    home: '/',
    signIn: '/sign-in',
    about: '/about',
    posts: '/posts',
    users: '/users',
  },
};
