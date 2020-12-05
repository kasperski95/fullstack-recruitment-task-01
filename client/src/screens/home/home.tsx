import { MainTemplate } from '@src/components/templates/main-template';
import { useI18n } from '@src/config/configure-i18n';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { NotesForm } from './components/notes-form';
import { NotesList } from './components/notes-list';

export function Home() {
  const { styles } = useStyle();
  const { translations } = useI18n();

  return (
    <MainTemplate
      title={() => {
        return <div style={styles.titleWrapper}>{translations.title}</div>;
      }}
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
