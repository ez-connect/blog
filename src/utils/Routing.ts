import { Issue, Label, Routing as RoutingBase } from 'git-cms-service';
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

  public getTagPath(value: Label): string {
    return `${config.router.tags}/${RoutingBase.getTagSlug(value)}`;
  }

  public getPostPath(value: Issue): string {
    return `${config.router.posts}/${RoutingBase.getPostSlug(value)}`;
  }
}

const singleton = new Routing();
export { singleton as Routing };
