import './styles.css';

import React from 'react';
import * as timeago from 'timeago.js';

import { config } from '~/constants';
import { IssueListProps } from '~/models';
import { Markdown } from '~/utils';

import { HorizonTagList } from './HorizonTagList';
import { PinPost } from './PinPost';

export class PinPostList extends React.PureComponent<IssueListProps> {
  public render() {
    const { items } = this.props;
    if (items.length === 0) {
      return null;
    }

    const firstPost = items[0];
    const { number, title, body, user, labels, updated_at } = firstPost;
    const { login } = user;
    return (
      <div className="container pt-4 pb-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="card border-0 mb-4 box-shadow h-xl-300">
              <img
                className="pin-post-main-image"
                src={Markdown.getImage(body)}
                alt=""
              />
              <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                <h2 className="h4 font-weight-bold">
                  <a
                    className="text-dark"
                    href={`${config.router.posts}/${number}`}
                  >
                    {title}
                  </a>
                </h2>
                <p className="card-text">
                  <div className="description">
                    {Markdown.getDescription(body)}
                  </div>
                  <HorizonTagList items={labels} />
                </p>
                <div>
                  <small className="d-block">
                    <a
                      className="text-muted"
                      href={`${config.router.users}/${login}`}
                    >
                      {login}
                    </a>
                  </small>
                  <small className="text-muted">
                    {timeago.format(updated_at)}
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="flex-md-row mb-4 box-shadow h-xl-300">
              {this._renderPosts()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _renderPosts() {
    const { items } = this.props;
    const remainItems = items.slice(1);
    return remainItems.map((v) => <PinPost key={v.number} item={v} />);
  }
}
