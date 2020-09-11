import '~/assets/styles/main.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import { config } from './constants';
import { HomePage, PostPage } from './pages';

class App extends React.PureComponent {
  public render() {
    return (
      <BrowserRouter>
        <ScrollMemory />
        <Switch>
          <Route path={`${config.router.posts}/:id`} component={PostPage} />
          <Route path={config.router.home} component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
