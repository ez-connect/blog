import { Issue, Label, Routing,Service } from 'git-cms-service';
import React from 'react';

import {
  Footer,
  NavBar,
  PostBody,
  PostHeader,
  ScrollToTop,
} from '~/components';

interface State {
  item?: Label;
  posts: Issue[];
}

export class TagPage extends React.Component<any, State> {
  public state: State = {
    posts: [],
  };

  public componentDidMount() {
    this._load(this.props.location.item);
  }

  public shouldComponentUpdate(nextProps, nextState): boolean {
    if (this.props !== nextProps) {
      this._load(nextProps.location.item);
    }

    return this.state !== nextState;
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
      <div key={item.id}>
        <PostHeader item={item} useLineClamp />
        <PostBody item={item} useLineClamp />
      </div>
    );
  }

  private async _load(item: Label) {
    if (!item) {
      const name = Routing.getTagNameFromPath(this.props.match.params.id);
      item = { name };
    }

    this.setState({ item });

    const posts = await Service.findPostsByLabel(item.name);
    this.setState({ posts });
  }
}
