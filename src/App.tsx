import '~/assets/styles/main.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import { config } from './configs';
import { HomePage, PostPage } from './pages';
import { TagPage } from './pages/TagPage';
import { Service } from './services';
import { Rest } from './services/Rest';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    Rest.init(config.service.rest);
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
}

export default App;
