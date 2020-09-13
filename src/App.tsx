import '~/assets/styles/main.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import { config } from './configs';
import { HomePage, PostPage } from './pages';
import { TagPage } from './pages/TagPage';
import { Service } from './services';
import { Rest } from './services/Rest';
import { Routing } from './utils';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    Rest.init(config.service.rest);
    Rest.on(Rest.kOnUnauthorized, this._onUnauthorized);
    Service.init(config.service);
  }

  public render() {
    return (
      <BrowserRouter>
        <ScrollMemory />
        <Switch>
          <Route path={`${config.router.tags}/:id`} component={TagPage} />
          <Route path={`${config.router.posts}/:id`} component={PostPage} />

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
