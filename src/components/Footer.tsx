import './styles.css';

import React from 'react';

import { config } from '~/configs';
import { Issue, Item } from '~/models';
import { GitHub } from '~/services';
import { Markdown } from '~/utils';

export class Footer extends React.PureComponent<any, Item<Issue>> {
  private static _item?: Issue;

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
    if (!Footer._item) {
      const items = await GitHub.findIssues({
        labels: config.labels.data.footer,
      });
      if (items.length > 0) {
        Footer._item = items[0];
      }
    }

    this.setState({ item: Footer._item });
  }
}
