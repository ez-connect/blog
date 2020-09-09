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
  navIssueNumber: 1,
  footerIssueNumber: 2,
  headerIssueNumber: 3,
  router: {
    home: '/',
    signIn: '/sign-in',
    about: '/about',
    posts: '/posts',
  },
};
