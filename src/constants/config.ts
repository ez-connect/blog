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
    nav: 'nav',
    header: 'header',
    footer: 'footer',
    single: 'single',
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
