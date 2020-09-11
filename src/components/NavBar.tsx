import React from 'react';
import { Link } from 'react-router-dom';

import { config } from '~/constants';
import { Issue, IssueState } from '~/models';
import { Label } from '~/models/label';
import { GitHub } from '~/services';
import { Markdown, Routing } from '~/utils';

export class NavBar extends React.PureComponent<any, IssueState> {
  private static _item?: Issue;

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
            <Link className="navbar-brand" to={config.router.home}>
              <strong>{data.title?.raw}</strong>
            </Link>
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
    if (!NavBar._item) {
      const items = await GitHub.findIssues({
        labels: config.specicalLabel.nav,
      });
      if (items.length > 0) {
        NavBar._item = items[0];
      }
    }
    this.setState({ item: NavBar._item });
  }

  private _renderTag(item: Label) {
    const { name } = item;
    return (
      <li key={name} className="nav-item">
        <Link className="nav-link" to={Routing.getTagPath(item)}>
          {name}
        </Link>
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
