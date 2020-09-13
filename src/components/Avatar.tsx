import React from 'react';

import { Item, User } from '~/models';
import { Service } from '~/services';

export class Avatar extends React.PureComponent<Item<User>, Item<User>> {
  private static _items: User[] = [];

  constructor(props: Item<User>) {
    super(props);
    this.state = { item: props.item };
  }

  public componentDidMount() {
    this._load();
  }

  public render() {
    const { children } = this.props;
    const { item } = this.state;
    const { avatar_url, login, name } = item;
    return (
      <div className="d-flex align-items-center">
        <img
          className="rounded-circle"
          src={avatar_url}
          width="48"
          alt={name}
        />
        <small className="ml-2">
          {name ?? login} in &nbsp;
          {children}
        </small>
      </div>
    );
  }

  private async _load() {
    let { item } = this.props;
    const { id, login, username, name } = item;

    // GitHub only
    if (!name) {
      item = Avatar._items.find((e) => e.id === id);
      if (!item) {
        item = await Service.findOneUser(login ?? username);
        Avatar._items.push(item);
      }

      this.setState({ item });
    }
  }
}
