import { Routing as RoutingBase } from 'git-cms-service';
import { createBrowserHistory } from 'history';

import { config } from '~/configs';

const history = createBrowserHistory();

class Routing {
  public getCurrentPath(): string {
    return window.location.pathname;
  }

  public push(pathname: string) {
    // if (window.location.pathname !== pathname) {
    //   window.location.replace(pathname);
    // }
    history.push(pathname);
  }

  public getTagPath(value: string): string {
    return `${process.env.PUBLIC_URL}${config.router.tags}/${RoutingBase.getTagSlug(value)}`;
  }

  public getPostPath(title: string, id: number): string {
    return `${process.env.PUBLIC_URL}${config.router.posts}/${RoutingBase.getPostSlug(title, id)}`;
  }
}

const singleton = new Routing();
export { singleton as Routing };
