import '~/assets/styles/main.css';

import { Logger, Rest, Service } from 'git-cms-service';
import React from 'react';
import ReactGA from 'react-ga';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import { config } from './configs';
import { AuthPage, HomePage, PostPage, TagPage } from './pages';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    Rest.onError(this._onError);
    Service.init(config.service);

    if (config.trackingCode) {
      ReactGA.initialize(config.trackingCode);
    }
  }

  public render() {
    const { tags, posts, auth, home } = config.router;
    return (
      <HashRouter basename={process.env.PUBLIC_URL}>
        <ScrollMemory />
        <Switch>
          <Route path={`${tags}/:id`} component={TagPage} />
          <Route path={`${posts}/:id`} component={PostPage} />
          <Route path={auth} component={AuthPage} />

          <Route path={home} component={HomePage} />
        </Switch>
      </HashRouter>
    );
  }

  private _onError() {
    Logger.warn(Service.getSignInURL());
    // window.location.href = Service.getSignInURL();
  }
}

export default App;
