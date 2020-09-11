import React from 'react';

import {
  Footer,
  NavBar,
  PostBody,
  PostHeader,
  ScrollToTop,
} from '~/components';
import { Issue, IssueState, Label } from '~/models';
import { GitHub } from '~/services';
import { Routing } from '~/utils';

interface State {
  item?: Label;
  posts: Issue[];
}

export class TagPage extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { item: props.location.item, posts: [] };
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

        {/* <PostHeader item={item} />
        <PostBody item={item} /> */}

        <Footer />
      </>
    );
  }

  private async _load() {
    let { item } = this.state;
    if (!item) {
      const name = Routing.getTagNameFromPath(this.props.match.params.id);
      console.warn(name)
      item = await GitHub.findOneLabel(name);
      this.setState({ item });
    }
  }
}
