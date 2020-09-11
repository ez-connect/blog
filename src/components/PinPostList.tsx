import './styles.css';

import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

import { Issue, ItemList } from '~/models';
import { Markdown, Routing } from '~/utils';

import { Avatar } from './Avatar';
import { HorizonTagList } from './HorizonTagList';
import { PinPost } from './PinPost';

export class PinPostList extends React.PureComponent<ItemList<Issue>> {
  public render() {
    const { items } = this.props;
    if (items.length === 0) {
      return null;
    }

    const firstPost = items[0];
    const { title, body, user, labels, updated_at } = firstPost;
    return (
      <div className="container pt-4 pb-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="card border-0 mb-4 box-shadow">
              <img
                className="pin-post-main-image"
                src={Markdown.getImage(body)}
                alt=""
              />
              <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                <h2 className="h4 font-weight-bold">
                  <Link
                    className="text-dark"
                    to={{
                      pathname: Routing.getPostPath(firstPost),
                      item: firstPost,
                    }}
                  >
                    {title}
                  </Link>
                </h2>

                <p className="card-text description">
                  {Markdown.getDescription(body)}
                </p>

                <Avatar item={user}>
                  <span>
                    <HorizonTagList items={labels} />
                  </span>
                  <span className="text-muted d-block">
                    {timeago.format(updated_at)} •{' '}
                    {Markdown.getReadingTime(body)}
                  </span>
                </Avatar>
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
