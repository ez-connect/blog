import './styles.css';

import { Issue } from 'git-cms-service';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '~/components';

interface Props {
  item: Issue;
  useLineClamp?: boolean;
}

export class PostBody extends React.PureComponent<Props> {
  public render() {
    const { item, useLineClamp } = this.props;
    return (
      <div className="container pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8">
            <article className="article-post">
              <ReactMarkdown
                className={useLineClamp ? 'description-long' : undefined}
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
