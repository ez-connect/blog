/*
 * https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
 */

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component<RouteComponentProps> {
  public componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

const component = withRouter(ScrollToTop);
export { component as ScrollToTop };
