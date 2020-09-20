import './styles.css';

import { Label, Service } from 'git-cms-service';
import React from 'react';
import { Link } from 'react-router-dom';

import { Routing } from '~/utils';

// interface Total {
//   name: string;
//   total: number;
// }

interface State {
  items: Label[];
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
        {items.map((item) => {
          const { name } = item;
          return (
            <p key={name}>
              <Link
                to={{ pathname: Routing.getTagPath(name), item }}
                className="text-dark"
              >
                <span className="font-weight-bold">{name}</span>
              </Link>
            </p>
          );
        })}
      </>
    );
  }

  private async _load() {
    const issue = await Service.findTag();
    this.setState({ items: issue.labels });
  }
}
