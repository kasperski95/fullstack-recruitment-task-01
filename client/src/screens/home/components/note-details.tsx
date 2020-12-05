import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { Button } from '@src/components/buttons';
import { Fetcher } from '@src/components/fetcher';
import { Markdown } from '@src/components/markdown';
import { useI18n } from '@src/config/configure-i18n';
import { useStore } from '@src/config/configure-store';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { Note } from '@src/models/note';
import { humanizeDate } from '@src/utils/humanize-date';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function NoteDetails(props: { noteId: string }) {
  const { styles } = useStyle();
  const { state, dispatch } = useStore();
  const { translations } = useI18n();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc(
    'note',
    async ({ noteId, notes }: { noteId: string; notes: Note[] }) => {
      return notes.find(({ id }) => noteId === id)!;
    }
  );

  React.useEffect(() => {
    fetcherBloc.dispatch(
      new FetcherEvents.Fetch({ noteId: props.noteId, notes: state.notes })
    );
  }, [props.noteId, fetcherBloc, state.notes]);

  React.useEffect(() => () => {
    fetcherBloc.dispatch(new FetcherEvents.Reset());
  });

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
                onClick={() => {
                  dispatch('deleteNode')({ noteId: note.id });
                  history.push(routes.home);
                  fetcherBloc.dispatch(new FetcherEvents.Reset());
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
