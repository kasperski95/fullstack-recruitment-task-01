import { Card } from '@src/components/card';
import { Markdown } from '@src/components/markdown';
import { useConnection } from '@src/config/configure-connection-utils';
import { useI18n } from '@src/config/configure-i18n';
import { useStore } from '@src/config/configure-store';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { deleteNoteMutation } from '@src/gql/delete-note-mutations';
import { combine } from '@src/modules/css-in-jsx';
import { humanizeDate } from '@src/utils/humanize-date';
import React from 'react';
import { Link } from 'react-router-dom';

export function NoteCard(props: { index: number; style: React.CSSProperties }) {
  const { styles, dimensions } = useStyle();
  const { state, dispatch } = useStore();
  const { translations } = useI18n();
  const { gql } = useConnection();

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
        actions={[
          {
            label: translations.home.deleteNote,
            onClick: async () => {
              dispatch('deleteNode')({ noteId: note.id });
              try {
                await gql(deleteNoteMutation({ id: note.id }));
              } catch (err) {
                console.error(err);
                dispatch('addNote')({ note });
              }
            },
          },
        ]}
        title={() => (
          <Link style={styles.title} to={`${routes.details}?n=${note.id}`}>
            {humanizeDate(note.date)}
          </Link>
        )}
      >
        <span className='note-card-content'>
          <Markdown
            children={note.content.substr(
              0,
              Math.min(200, note.content.length)
            )}
          />
        </span>
      </Card.Content>
    </Card.Wrapper>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  title: {
    color: theme.clickable.strong,
    textDecoration: 'none',
  },
}));
