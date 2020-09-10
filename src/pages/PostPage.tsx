import React from 'react';

import { Footer, NavBar, PostBody, PostHeader } from '~/components';
import { IssueState } from '~/models';
import { GitHub } from '~/services';

export class PostPage extends React.PureComponent<any, IssueState> {
  constructor(props: any) {
    super(props);
    console.warn(props);
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
        <NavBar />

        <PostHeader item={item} />
        <PostBody item={item} />

        <Footer />
      </>
    );
  }

  private async _load() {
    let { item } = this.state;
    if (!item) {
      const id = this.props.match.params.id;
      item = await GitHub.findOneIssue(id);
      this.setState({ item });
    }
  }
}
