import React from 'react';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '~/components';
import { IssueProps } from '~/models';

export class PostBody extends React.PureComponent<IssueProps> {
  public render() {
    const { item } = this.props;
    return (
      <div className="container pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8">
            <article className="article-post">
              <ReactMarkdown
                source={item.body}
                renderers={{ code: CodeBlock }}
              />
            </article>
          </div>
        </div>
      </div>
    );
  }
}
