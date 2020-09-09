// https://www.fergusfrl.xyz/blog/syntax-highlighting-in-react-markdown

import React from 'react';
import { Prism } from 'react-syntax-highlighter';

interface Props {
  language: string;
  value: string;
}

export class CodeBlock extends React.PureComponent<Props> {
  public render() {
    const { language, value } = this.props;
    return <Prism language={language}>{value}</Prism>;
  }
}
