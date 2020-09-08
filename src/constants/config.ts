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
  router: {
    home: '/',
    signIn: '/sign-in',
  },
};
