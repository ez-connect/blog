import './styles.css';

import { Issue, Item, Markdown } from 'git-cms-service';
import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

import {  Routing } from '~/utils';

import { Avatar } from './Avatar';
import { HorizonTagList } from './HorizonTagList';

export class PinPost extends React.PureComponent<Item<Issue>> {
  public render() {
    const { item } = this.props;
    const { id, title, body, labels, user, updated_at } = item;
    return (
      <div className="mb-3 d-flex align-items-center">
        <img className="post-list-image" src={Markdown.getImage(body)} alt="" />
        <div className="pl-3">
          <h2 className="mb-2 h6 font-weight-bold">
            <Link
              className="text-dark"
              to={{
                pathname: Routing.getPostPath(title, id),
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
              {timeago.format(updated_at)} • {Markdown.getReadingTime(body)}
            </span>
          </Avatar>
        </div>
      </div>
    );
  }
}
