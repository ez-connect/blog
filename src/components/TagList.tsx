import './styles.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { Label } from '~/models';
import { GitHub } from '~/services';
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
        {items.map((e) => {
          const { name } = e;
          return (
            <p key={name}>
              <Link to={Routing.getTagPath(e)} className="text-dark">
                <span className="font-weight-bold">{name}</span>
              </Link>
            </p>
          );
        })}
      </>
    );
  }

  private async _load() {
    const items = await GitHub.findLabels();
    this.setState({ items });
  }
}
