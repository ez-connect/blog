import './styles.css';

import React from 'react';
import * as timeago from 'timeago.js';

import { config } from '~/constants';
import { IssueListProps } from '~/models';
import { Markdown } from '~/utils';

export class PostList extends React.PureComponent<IssueListProps> {
  public render() {
    const { items } = this.props;

    return (
      <>
        <h5 className="font-weight-bold spanborder">
          <span>Latest</span>
        </h5>
        {items.map((e) => {
          const { number, title, body, user, updated_at } = e;
          return (
            <div className="mb-3 d-flex justify-content-between">
              <div className="pr-3">
                <h2 className="mb-1 h4 font-weight-bold">
                  <a
                    className="text-dark"
                    href={`${config.router.posts}/${number}`}
                  >
                    {title}
                  </a>
                </h2>
                <p>{Markdown.getDescription(body)}</p>
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
      </>
    );
  }
}
