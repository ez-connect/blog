import React from 'react';

import { Footer, Header, NavBar } from '~/components';

export class HomePage extends React.PureComponent {
  public render() {
    return (
      <>
        <NavBar />
        <Header />

        <Footer />
      </>
    );
  }
}
