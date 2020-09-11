import './styles.css';

import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

import { IssueListProps } from '~/models';
import { Markdown, Routing } from '~/utils';

import { HorizonTagList } from './HorizonTagList';

export class PostList extends React.PureComponent<IssueListProps> {
  public render() {
    const { items } = this.props;

    return (
      <>
        <h5 className="font-weight-bold spanborder">
          <span>Latest</span>
        </h5>
        {items.map((item) => {
          const { number, title, body, labels, user, updated_at } = item;
          return (
            <div key={number} className="mb-3 d-flex justify-content-between">
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
                <div className="card-text">
                  <div className="description">
                    {Markdown.getDescription(body)}
                  </div>
                  <HorizonTagList items={labels} />
                </div>
                <div className="card-text text-muted small">{user.login}</div>
                <small className="text-muted">
                  {timeago.format(updated_at)}
                </small>
              </div>
              <img
                className="story-post-image"
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
