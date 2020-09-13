import './styles.css';

import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

import { Issue, ItemList } from '~/models';
import { Markdown, Routing } from '~/utils';

import { Avatar } from './Avatar';
import { HorizonTagList } from './HorizonTagList';

export class PostList extends React.PureComponent<ItemList<Issue>> {
  public render() {
    const { items } = this.props;

    return (
      <>
        <h5 className="font-weight-bold spanborder">
          <span>Latest</span>
        </h5>
        {items.map((item) => {
          const { id, title, body, labels, user, updated_at } = item;
          return (
            <div key={id} className="mb-3 d-flex justify-content-between">
              <div className="pr-3">
                <h2 className="mb-1 h4 font-weight-bold">
                  <Link
                    className="text-dark"
                    to={{
                      pathname: Routing.getPostPath(item),
                      item,
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
              <img
                className="post-list-image"
                src={Markdown.getImage(body)}
                alt=""
              />
            </div>
          );
        })}

        <div className="container">
          <div className="col-md-12 text-center">
            <button type="button" className="flex btn btn-link">
              Show more ↺
            </button>
          </div>
        </div>
      </>
    );
  }
}
