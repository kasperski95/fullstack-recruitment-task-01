import { useStore } from '@src/config/configure-store';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useNotesListHeight } from '../hooks/use-notes-list-height';
import { NoteCard } from './note-card';

export function NotesList() {
  const { styles } = useStyle();
  const { state } = useStore();

  const { containerRef, height } = useNotesListHeight();

  return (
    <div style={styles.container}>
      <div ref={containerRef} style={styles.dummy} />
      <List
        width='100%'
        height={height}
        itemSize={136}
        itemCount={state.notes.length}
        style={styles.list}
      >
        {NoteCard}
      </List>
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  list: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dummy: {
    height: '100%',
  },
}));
