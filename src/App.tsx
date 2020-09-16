import '~/assets/styles/main.css';

import { Service } from 'git-cms-service';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import { config } from './configs';
import { AuthPage, HomePage, PostPage,TagPage } from './pages';
import { Routing } from './utils';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    Service.init(config.service);
    Service.onUnauthorized(this._onUnauthorized);
  }

  public render() {
    return (
      <BrowserRouter>
        <ScrollMemory />
        <Switch>
          <Route path={`${config.router.tags}/:id`} component={TagPage} />
          <Route path={`${config.router.posts}/:id`} component={PostPage} />
          <Route path={config.router.auth} component={AuthPage} />

          <Route path={config.router.home} component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }

  private _onUnauthorized() {
    Routing.push(config.router.signIn);
  }
}

export default App;
