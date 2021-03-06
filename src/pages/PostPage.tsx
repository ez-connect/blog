import { Issue, Item, Routing, Service } from 'git-cms-service';
import React from 'react';

import {
  Footer,
  NavBar,
  PostBody,
  PostHeader,
  ScrollToTop,
} from '~/components';

export class PostPage extends React.PureComponent<any, Item<Issue>> {
  public state: Item<Issue> = {};

  public componentDidMount() {
    this._load();
  }

  public render() {
    const { item } = this.state;
    if (!item) {
      return null;
    }

    return (
      <>
        <ScrollToTop />
        <NavBar />

        <PostHeader item={item} />
        <PostBody item={item} />

        <Footer />
      </>
    );
  }

  private async _load() {
    let { item } = this.props.location;
    if (!item) {
      const id = Routing.getPostIdFromPath(this.props.match.params.id);
      item = await Service.findOnePost(id);
    }

    this.setState({ item });
  }
}
