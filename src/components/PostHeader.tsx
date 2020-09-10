import React from 'react';
import * as timeago from 'timeago.js';

import { IssueProps } from '~/models';

import { HorizonTagList } from './HorizonTagList';

export class PostHeader extends React.PureComponent<IssueProps> {
  public render() {
    const { item } = this.props;
    const { title, labels, user, updated_at } = item;
    return (
      <div className="container pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 secondfont mb-3 font-weight-bold">
              {title}
            </h1>
            <div className="row justify-content-between">
              <div className="d-flex align-items-center">
                {/* <img
                  className="rounded-circle"
                  src={avatar?.image?.url}
                  width="70"
                /> */}
                <small className="ml-2">
                  {user.login}
                  <span className="text-muted d-block">
                    {timeago.format(updated_at)} in &nbsp;
                    <span>
                      <HorizonTagList items={labels} />
                    </span>
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
