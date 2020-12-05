import { Card } from '@src/components/card';
import { Markdown } from '@src/components/markdown';
import { useI18n } from '@src/config/configure-i18n';
import { useStore } from '@src/config/configure-store';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import { humanizeDate } from '@src/utils/humanize-date';
import React from 'react';
import { Link } from 'react-router-dom';

export function NoteCard(props: { index: number; style: React.CSSProperties }) {
  const { styles, dimensions } = useStyle();
  const { state } = useStore();
  const { translations } = useI18n();
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
        actions={[{ label: translations.home.deleteNote, onClick: () => {} }]}
        title={() => (
          <Link style={styles.title} to={`${routes.details}?n=${note.id}`}>
            {humanizeDate(note.date)}
          </Link>
        )}
      >
        <span style={styles.content} className='note-card-content'>
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
  content: {},
  title: {
    color: theme.clickable.strong,
    textDecoration: 'none',
  },
}));
