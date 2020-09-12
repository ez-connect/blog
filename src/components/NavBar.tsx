import React from 'react';
import { Link } from 'react-router-dom';

import { config } from '~/configs';
import { Issue, Item } from '~/models';
import { Label } from '~/models/label';
import { Service } from '~/services';
import { Markdown, Routing } from '~/utils';

export class NavBar extends React.PureComponent<any, Item<Issue>> {
  private static _item?: Issue;

  public state: Item<Issue> = {};

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

              {this._renderSignIn()}
            </div>
          </div>
        </nav>
      </>
    );
  }

  private _renderSignIn() {
    const { authorization } = config.service;
    if (!authorization) {
      return null;
    }

    return (
      <ul
        className="navbar-nav ml-auto d-flex align-items-center"
        onClick={() =>
          Service.signIn(authorization.clientId, authorization.directUri)
        }
      >
        <li className="nav-item highlight">
          <span className="nav-link btn">Sign in</span>
        </li>
      </ul>
    );
  }

  private async _load() {
    if (!NavBar._item) {
      const items = await Service.findIssuesByLabel(config.labels.nav);
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
        <Link
          className="nav-link"
          to={{
            pathname: Routing.getTagPath(item),
            item,
          }}
        >
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
