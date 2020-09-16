import { Service } from 'git-cms-service';
import React from 'react';

import { config } from '~/configs';
import { Routing } from '~/utils';

export class AuthPage extends React.PureComponent {
  public componentDidMount() {
    this._load();
  }

  public render() {
    return <div>Please wait...</div>;
  }

  private async _load() {
    const code = window.location.search.replace('?code=', '');
    console.warn(code);

    const token = await Service.getAccessToken(code);
    // console.warn(token);
    localStorage.setItem('token', token);
    Routing.push(config.router.home);
  }
}
