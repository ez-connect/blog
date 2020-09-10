import './styles.css';

import React from 'react';

import { GitHub } from '~/services';

interface Total {
  name: string;
  total: number;
}

interface State {
  items: Total[];
}

export class TagList extends React.PureComponent<any, State> {
  public state: State = { items: [] };

  public componentDidMount() {
    this._load();
  }

  public render() {
    const { items } = this.state;
    if (items.length === 0) {
      return null;
    }

    return (
      <>
        <h5 className="font-weight-bold spanborder">
          <span>Tags</span>
        </h5>
        {items.map((e) => {
          const { name, total } = e;
          if (total === 0) {
            return null;
          }

          return (
            <p key={name}>
              <a href={`/${name}`} className="text-dark">
                <span className="font-weight-bold">{name}</span>
              </a>

              <span className="text-muted"> ({total})</span>
            </p>
          );
        })}
      </>
    );
  }

  private async _load() {
    const labels = await GitHub.findLabels();
    const items: Total[] = [];
    for (const e of labels) {
      const total = await GitHub.countIssuesByLabel(e.name);
      items.push({ name: e.name, total });
    }
    this.setState({ items });
  }
}
