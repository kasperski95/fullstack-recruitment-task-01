import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export function Markdown(props: { children: string }) {
  return <ReactMarkdown plugins={[gfm]} children={props.children} />;
}
