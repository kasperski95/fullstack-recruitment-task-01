import { MainTemplate } from '@src/components/templates/main-template';
import { useI18n } from '@src/config/configure-i18n';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NotesForm } from './components/notes-form';
import { NotesList } from './components/notes-list';
import { NoteModal } from './modals/note-modal';

export function Home(props: { noteId?: string | null }) {
  const { styles } = useStyle();
  const { translations } = useI18n();
  const history = useHistory();

  return (
    <MainTemplate
      title={() => {
        return <div style={styles.titleWrapper}>{translations.title}</div>;
      }}
      modal={
        props.noteId
          ? {
              component: <NoteModal noteId={props.noteId!} />,
              onGoBack: () => {
                history.push(routes.home);
              },
            }
          : undefined
      }
    >
      <NotesForm />
      <NotesList />
    </MainTemplate>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
