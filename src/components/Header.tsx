import './styles.css';

import React from 'react';

import { config } from '~/constants';
import { IssueState } from '~/models';
import { GitHub } from '~/services';
import { Markdown } from '~/utils';

export class Header extends React.PureComponent<any, IssueState> {
  public state: IssueState = {};

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
                <a href={config.router.about} className="btn btn-dark">
                  {data.buttonText?.raw}
                </a>
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
    const items = await GitHub.findIssues({ labels: config.specicalLabel.header });
    if (items.length > 0) {
      this.setState({ item: items[0] });
    }
  }
}
