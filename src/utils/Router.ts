import { createBrowserHistory } from 'history';

import { config } from '~/constants';

export const history = createBrowserHistory();

class Router {
  public getCurrentPath(): string {
    return window.location.pathname;
  }

  public push(pathname: string) {
    // if (window.location.pathname !== pathname) {
    //   window.location.replace(pathname);
    // }
    history.push(pathname);
  }

  public home = (): void => {
    this.push(config.router.home);
  };

  public signIn = (): void => {
    this.push(config.router.signIn);
  };
}

const singleton = new Router();
export { singleton as Router };
