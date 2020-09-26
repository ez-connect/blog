import './styles.css';

import { Label } from 'git-cms-service';
import React from 'react';
import { Link } from 'react-router-dom';

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
        {items.map((item) => {
          const { name } = item;
          return (
            <span key={name}>
              <Link
                className="badge"
                style={this._getBadgeStyle(item)}
                to={Routing.getTagPath(name)}
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
    const backgroundColor = value.color ? `#${value.color}` : '#808080';
    return {
      backgroundColor,
      color: 'white',
    };
  }
}
