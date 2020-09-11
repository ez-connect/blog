import React from 'react';
import * as timeago from 'timeago.js';

import { Issue, Item } from '~/models';
import { Markdown } from '~/utils';

import { Avatar } from './Avatar';
import { HorizonTagList } from './HorizonTagList';

export class PostHeader extends React.PureComponent<Item<Issue>> {
  public render() {
    const { item } = this.props;
    const { title, body, labels, user, updated_at } = item;
    return (
      <div className="container pt-4 pb-4">
        <div className="h-100 tofront">
          <h1 className="display-4 secondfont mb-3 font-weight-bold">
            {title}
          </h1>

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
