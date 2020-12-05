import { useStore } from '@src/config/configure-store';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { NoteCard } from './note-card';

export function NotesList() {
  // const {} = useStyle();
  const { state } = useStore();

  return (
    <List
      width='100%'
      height={300}
      itemSize={100}
      itemCount={state.notes.length}
    >
      {NoteCard}
    </List>
  );
}

// const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
//   container: {},
// }));
