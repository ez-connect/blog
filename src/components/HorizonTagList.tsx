import './styles.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { Label } from '~/models';
import { Routing } from '~/utils';

interface Props {
  items: Label[];
}

export class HorizonTagList extends React.PureComponent<Props> {
  public render() {
    const { items } = this.props;
    if (items.length === 0) {
      return null;
    }

    return (
      <>
        {items.map((e) => {
          const { name } = e;
          return (
            <span key={name}>
              <Link
                className="badge"
                style={this._getBadgeStyle(e)}
                to={Routing.getTagPath(e)}
              >
                {name}
              </Link>
              &nbsp;
            </span>
          );
        })}
      </>
    );
  }

  private _getBadgeStyle(value: Label): React.CSSProperties {
    return {
      backgroundColor: `#${value.color}`,
      color: 'white',
    };
  }
}
