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
    const slug = slugify(value.name, { lower: true });
    const id = value.id;
    return `${config.router.tags}/${slug}-${id}`;
  }

  public getPostPath(value: Issue): string {
    const slug = slugify(value.title, { lower: true });
    const id = value.number ?? value.iid;
    return `${config.router.posts}/${slug}-${id}`;
  }

  public getIdFromPath(value: string): number {
    const matches = value.match(/.*-(\d+)$/);
    if (matches.length > 0) {
      return Number.parseInt(matches[1], 10);
    }

    return 0;
  }
}

const singleton = new Routing();
export { singleton as Routing };
