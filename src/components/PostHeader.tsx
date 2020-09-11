import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

import { Issue, Item } from '~/models';
import { Markdown, Routing } from '~/utils';

import { Avatar } from './Avatar';
import { HorizonTagList } from './HorizonTagList';

interface Props {
  item: Issue;
  useLineClamp?: boolean;
}

export class PostHeader extends React.PureComponent<Props> {
  public render() {
    const { item } = this.props;
    const { body, labels, user, updated_at } = item;
    return (
      <div className="container pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8">
            {this._renderTitle()}

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
      </div>
    );
  }

  private _renderTitle() {
    const { item, useLineClamp } = this.props;
    const { title } = item;
    if (useLineClamp) {
      return (
        <Link to={Routing.getPostPath(item)}>
          <h1 className="display-4 secondfont mb-3 font-weight-bold">
            {title}
          </h1>
        </Link>
      );
    }

    return (
      <h1 className="display-4 secondfont mb-3 font-weight-bold">{title}</h1>
    );
  }
}
