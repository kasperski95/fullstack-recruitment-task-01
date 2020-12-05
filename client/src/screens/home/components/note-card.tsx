import { Card } from '@src/components/card';
import { useStore } from '@src/config/configure-store';
import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';

export function NoteCard(props: { index: number; style: React.CSSProperties }) {
  const { dimensions } = useStyle();

  const { state } = useStore();
  const note = state.notes[props.index];

  const marginBottom = dimensions.gutterMedium;

  return (
    <Card.Wrapper
      style={combine([
        props.style,
        {
          height: (props.style.height as number) - marginBottom,
          marginBottom,
        },
      ])}
    >
      <Card.Content
        title={`
          ${note.date.toLocaleDateString()} ${note.date.toLocaleTimeString()}
        `}
      >
        {note.content}
      </Card.Content>
    </Card.Wrapper>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({}));
