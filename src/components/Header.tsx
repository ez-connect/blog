import './styles.css';

import { Issue, Item, Markdown, Service } from 'git-cms-service';
import React from 'react';
import { Link } from 'react-router-dom';

import { config } from '~/configs';

export class Header extends React.PureComponent<any, Item<Issue>> {
  public state: Item<Issue> = {};

  public componentDidMount() {
    this._load();
  }

  public render() {
    const data = Markdown.parse(this.state.item?.body);
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid mb-3 pt-0 pb-0 bg-lightblue position-relative">
          <div className="pl-4 pr-0 h-100 tofront">
            <div className="row justify-content-between">
              <div className="col-md-6 pt-6 pb-6 align-self-center">
                <h1 className="secondfont mb-3 font-weight-bold">
                  {data.title?.raw}
                </h1>
                <p className="mb-3">{data.body?.raw}</p>
                <Link to={config.router.about} className="btn btn-dark">
                  {data.buttonText?.raw}
                </Link>
              </div>

              <img
                className="col-md-6 d-none d-md-block pr-0 header"
                src={Markdown.getImage(data.image?.raw)}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async _load() {
    const item = await Service.findHeader();
    this.setState({ item });
  }
}
