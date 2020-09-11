import React from 'react';

import {
  Footer,
  NavBar,
  PostBody,
  PostHeader,
  ScrollToTop,
} from '~/components';
import { Issue, Label } from '~/models';
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
    const { item, posts } = this.state;
    if (!item) {
      return null;
    }

    const { name, description } = item;
    return (
      <>
        <ScrollToTop />
        <NavBar />

        <div className="jumbotron">
          <h1 className="display-4 text-center">{name}</h1>
          <p className="text-center">{description}</p>
        </div>

        {posts.map(this._renderItem)}

        <Footer />
      </>
    );
  }

  private _renderItem(item: Issue) {
    return (
      <>
        <PostHeader item={item} useLineClamp />
        <PostBody item={item} useLineClamp />
      </>
    );
  }

  private async _load() {
    let { item } = this.state;
    if (!item) {
      const name = Routing.getTagNameFromPath(this.props.match.params.id);
      item = await GitHub.findOneLabel(name);
      this.setState({ item });
    }

    const posts = await GitHub.findIssues({ labels: item.name });
    this.setState({ posts });
  }
}
