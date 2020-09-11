import React from 'react';

import {
  Footer,
  NavBar,
  PostBody,
  PostHeader,
  ScrollToTop,
} from '~/components';
import { Issue, Item } from '~/models';
import { GitHub } from '~/services';
import { Routing } from '~/utils';

export class PostPage extends React.PureComponent<any, Item<Issue>> {
  constructor(props: any) {
    super(props);
    this.state = { item: props.location.item };
  }

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
    let { item } = this.props;
    if (!item) {
      const id = Routing.getPostIdFromPath(this.props.match.params.id);
      item = await GitHub.findOneIssue(id);
      this.setState({ item });
    }
  }
}
