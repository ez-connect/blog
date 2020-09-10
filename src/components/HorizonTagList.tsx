import './styles.css';

import React from 'react';

import { Label } from '~/models';

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
              <span className="badge" style={this._getBadgeStyle(e)}>
                {name}
              </span>
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
