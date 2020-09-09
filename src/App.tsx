import '~/assets/styles/main.css';

import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { config } from './constants';
import { HomePage } from './pages';
import { history } from './utils';

class App extends React.PureComponent {
  public render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={config.router.home}>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
