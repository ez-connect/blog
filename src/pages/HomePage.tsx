import React from 'react';

import { Footer, Header, NavBar, PinPostList } from '~/components';
import { config } from '~/constants';
import { Issue, Label } from '~/models';
import { GitHub } from '~/services';

interface State {
  posts: Issue[];
  tags: Label[];
}

export class HomePage extends React.PureComponent<any, State> {
  public state: State = {
    posts: [],
    tags: [],
  };

  public componentDidMount() {
    this._load();
  }

  public render() {
    return (
      <>
        <NavBar />
        <Header />

        <PinPostList items={this.state.posts} />

        <Footer />
      </>
    );
  }

  private async _load() {
    const posts = await GitHub.findIssues({ labels: config.data.post });
    this.setState({ posts });
  }
}
