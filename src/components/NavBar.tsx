import React from 'react';

import { config } from '~/constants';
import { IssueState } from '~/models';
import { Label } from '~/models/label';
import { GitHub } from '~/services';
import { Markdown } from '~/utils';

export class NavBar extends React.PureComponent<any, IssueState> {
  public state: IssueState = {};

  public componentDidMount() {
    this._load();
  }

  public render() {
    const { item } = this.state;
    const { labels, body } = item ?? {};
    const data = Markdown.parse(body);
    return (
      <>
        <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
          <div className="container">
            <a className="navbar-brand" href={config.router.home}>
              <strong>{data.title?.raw}</strong>
            </a>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse collapse" id="navbarColor02">
              <ul className="navbar-nav mr-auto d-flex align-items-center">
                {this._renderTagList(labels)}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }

  private async _load() {
    const items = await GitHub.findIssues({ labels: config.specicalLabel.nav });
    if (items.length > 0) {
      this.setState({ item: items[0] });
    }
  }

  private _renderTag(item: Label) {
    const { name } = item;
    return (
      <li key={name} className="nav-item">
        <a className="nav-link" href={`/${name}`}>
          {name}
        </a>
      </li>
    );
  }

  private _renderTagList(items?: Label[]) {
    if (!items) {
      return null;
    }

    return items.map(this._renderTag);
  }
}
