import './styles.css';

import React from 'react';
import * as timeago from 'timeago.js';

import { config } from '~/constants';
import { IssueProps } from '~/models';
import { Markdown } from '~/utils';

export class PinPost extends React.PureComponent<IssueProps> {
  public render() {
    const { item } = this.props;
    const { number, title, body, user, updated_at } = item;
    return (
      <div className="mb-3 d-flex align-items-center">
        <img className="pin-post-image" src={Markdown.getImage(body)} alt="" />
        <div className="pl-3">
          <h2 className="mb-2 h6 font-weight-bold">
            <a className="text-dark" href={`${config.router.posts}/${number}`}>
              {title}
            </a>
          </h2>
          <div className="card-text text-muted small">{user.login}</div>
          <small className="text-muted">{timeago.format(updated_at)}</small>
        </div>
      </div>
    );
  }
}
