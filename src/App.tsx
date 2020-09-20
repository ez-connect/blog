import '~/assets/styles/main.css';

import { Service } from 'git-cms-service';
import React from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import { config } from './configs';
import { AuthPage, HomePage, PostPage, TagPage } from './pages';
import { Routing } from './utils';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    Service.init(config.service);
    Service.onUnauthorized(this._onUnauthorized);

    if (config.trackingCode) {
      ReactGA.initialize(config.trackingCode);
    }
  }

  public render() {
    const { tags, posts, auth, home } = config.router;
    return (
      <BrowserRouter>
        <ScrollMemory />
        <Switch>
          <Route path={`${tags}/:id`} component={TagPage} />
          <Route path={`${posts}/:id`} component={PostPage} />
          <Route path={auth} component={AuthPage} />

          <Route path={home} component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }

  private _onUnauthorized() {
    Routing.push(config.router.signIn);
  }
}

export default App;
