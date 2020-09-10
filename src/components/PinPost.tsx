import './styles.css';

import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

import { config } from '~/constants';
import { IssueProps } from '~/models';
import { Markdown } from '~/utils';

import { HorizonTagList } from './HorizonTagList';

export class PinPost extends React.PureComponent<IssueProps> {
  public render() {
    const { item } = this.props;
    const { number, title, body, labels, user, updated_at } = item;
    return (
      <div className="mb-3 d-flex align-items-center">
        <img className="pin-post-image" src={Markdown.getImage(body)} alt="" />
        <div className="pl-3">
          <h2 className="mb-2 h6 font-weight-bold">
            <Link
              className="text-dark"
              to={{
                pathname: `${config.router.posts}/${number}`,
                item,
              }}
            >
              {title}
            </Link>
          </h2>
          <div className="card-text">
            <div className="description">{Markdown.getDescription(body)}</div>
            <HorizonTagList items={labels} />
          </div>
          <div className="card-text text-muted small">{user.login}</div>
          <small className="text-muted">{timeago.format(updated_at)}</small>
        </div>
      </div>
    );
  }
}
