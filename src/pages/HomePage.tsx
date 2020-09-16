import { Issue, Label, Service } from 'git-cms-service';
import React from 'react';

import {
  Footer,
  Header,
  NavBar,
  PinPostList,
  PostList,
  TagList,
} from '~/components';

interface State {
  pinPosts: Issue[];
  posts: Issue[];
  tags: Label[];
}

export class HomePage extends React.PureComponent<any, State> {
  public state: State = {
    pinPosts: [],
    posts: [],
    tags: [],
  };

  public componentDidMount() {
    this._load();
  }

  public render() {
    const { pinPosts, posts } = this.state;
    return (
      <>
        <NavBar />
        <Header />

        <PinPostList items={pinPosts} />

        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-8">
              <PostList items={posts} />
            </div>

            <div className="col-md-4">
              <TagList />
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  private async _load() {
    const pinPosts = await Service.findPinPosts({
      sort: 'updated',
      order: 'desc',
    });
    this.setState({ pinPosts });

    const posts = await Service.findPosts({
      sort: 'updated',
      order: 'desc',
    });
    this.setState({ posts });
  }
}
