import { useConnection } from '@src/config/configure-connection-utils';
import { useStore } from '@src/config/configure-store';
import { createUseStyle } from '@src/config/theme';
import { notesQuery } from '@src/gql/notes-query';
import { Note } from '@src/models/note';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useNotesListHeight } from '../hooks/use-notes-list-height';
import { NoteCard } from './note-card';

const initialVariables = { first: 10, after: undefined as string | undefined };

export function NotesList() {
  const { styles } = useStyle();
  const { containerRef, height } = useNotesListHeight();
  const { gql } = useConnection();
  const { dispatch, state } = useStore();

  React.useEffect(() => {
    (async () => {
      try {
        const notes = await gql<Note[], typeof initialVariables>(
          notesQuery(initialVariables)
        );
        dispatch('addNotes')({
          notes: (notes || []).map((note) => {
            note.date = new Date(note.date);
            return note;
          }),
        });
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const isItemLoaded = React.useCallback(
    (index: number) => !!state.notes[index],
    [state.notes]
  );

  const loadMoreItems = React.useCallback(
    async (startIndex: number, endIndex: number) => {
      try {
        const cursor =
          state.notes[Math.min(state.notes.length - 1, endIndex)].id;
        const notes = await gql<Note[], typeof initialVariables>(
          notesQuery({
            first: 2,
            after: cursor,
          })
        );
        dispatch('addNotes')({
          notes: (notes || []).map((note) => {
            note.date = new Date(note.date);
            return note;
          }),
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [state.notes, gql, dispatch]
  );

  return (
    <div style={styles.container}>
      <div ref={containerRef} style={styles.dummy} />
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={state.notes.length + 1}
        loadMoreItems={loadMoreItems}
      >
        {(p) => {
          return (
            <List
              width='100%'
              height={height}
              itemSize={136}
              itemCount={state.notes.length}
              style={styles.list}
              {...p}
            >
              {NoteCard}
            </List>
          );
        }}
      </InfiniteLoader>
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
