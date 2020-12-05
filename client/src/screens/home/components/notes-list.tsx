import { useStore } from '@src/config/configure-store';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { NoteCard } from './note-card';

export function NotesList() {
  const { styles } = useStyle();
  const { state } = useStore();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(300);

  React.useLayoutEffect(() => {
    const containerHeight = containerRef.current?.clientHeight;
    if (containerHeight) {
      setHeight(containerHeight);
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} style={styles.container}>
      <List
        width='100%'
        height={height}
        itemSize={100}
        itemCount={state.notes.length}
      >
        {NoteCard}
      </List>
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    flex: 1,
  },
}));
