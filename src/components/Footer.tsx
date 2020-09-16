import './styles.css';

import { Issue, Item, Markdown, Service } from 'git-cms-service';
import React from 'react';

export class Footer extends React.PureComponent<any, Item<Issue>> {
  public state: Item<Issue> = {};

  public componentDidMount() {
    this._load();
  }

  public render() {
    const data = Markdown.parse(this.state.item?.body);
    const { copyright, license } = data;
    return (
      <div className="container mt-5">
        <footer className="bg-white border-top p-3 text-muted small">
          <div className="row align-items-center justify-content-between">
            <div>{copyright?.raw}</div>
            <div dangerouslySetInnerHTML={{ __html: license?.raw }} />
          </div>
        </footer>
      </div>
    );
  }

  private async _load() {
    const item = await Service.findFooter();
    this.setState({ item });
  }
}
