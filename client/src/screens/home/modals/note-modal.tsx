import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { Button } from '@src/components/buttons';
import { Fetcher } from '@src/components/fetcher';
import { Markdown } from '@src/components/markdown';
import { useConnection } from '@src/config/configure-connection-utils';
import { useI18n } from '@src/config/configure-i18n';
import { useStore } from '@src/config/configure-store';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { deleteNoteMutation } from '@src/gql/delete-note-mutations';
import { noteQuery } from '@src/gql/note-query';
import { Note } from '@src/models/note';
import { humanizeDate } from '@src/utils/humanize-date';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function NoteModal(props: { noteId: string }) {
  const { styles } = useStyle();
  const { translations } = useI18n();
  const history = useHistory();
  const { dispatch } = useStore();
  const { gql } = useConnection();

  const fetcherBloc = useFetcherBloc(
    'note',
    async ({ noteId, notes }: { noteId: string; notes: Note[] }) => {
      const note = (await gql(noteQuery({ id: noteId }))) as Note;
      note.date = new Date(note.date);
      return note;
    }
  );

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch({ noteId: props.noteId }));
  }, [props.noteId, fetcherBloc]);

  React.useEffect(
    () => () => {
      fetcherBloc.dispatch(new FetcherEvents.Reset());
    },
    [fetcherBloc]
  );

  return (
    <Fetcher
      fetcherBloc={fetcherBloc}
      onNoResults={() => {
        history.push(routes.home);
      }}
      builder={(note) => {
        return (
          <div style={styles.container}>
            <div style={styles.actionsWrapper}>
              <Button.Flat
                label={translations.home.deleteNote}
                onClick={async () => {
                  dispatch('deleteNode')({ noteId: note.id });
                  history.push(routes.home);
                  fetcherBloc.dispatch(new FetcherEvents.Reset());
                  try {
                    await gql(deleteNoteMutation({ id: note.id }));
                  } catch (err) {
                    console.error(err);
                    dispatch('addNote')({ note });
                  }
                }}
              />
            </div>
            <div style={styles.title}>{humanizeDate(note.date)}</div>
            <Markdown children={note.content} />
          </div>
        );
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    padding: dimensions.gutterLarge,
    width: '100%',
  },
  actionsWrapper: {
    marginTop: -dimensions.gutterMedium,
    marginRight: -dimensions.gutterMedium,
    textAlign: 'right',
  },
  title: { ...shared.typography.h1, marginBottom: dimensions.gutterMedium },
  content: shared.typography.default,
}));
