import { createBrowserHistory } from 'history';
import slugify from 'slugify';

import { config } from '~/constants';
import { Issue, Label } from '~/models';

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
    return `${config.router.tags}/${value.name}`;
  }

  public getPostPath(value: Issue): string {
    const slug = slugify(value.title, { lower: true });
    const id = value.number ?? value.iid;
    return `${config.router.posts}/${slug}-${id}`;
  }
}

const singleton = new Routing();
export { singleton as Routing };
