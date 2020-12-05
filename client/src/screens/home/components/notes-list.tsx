import { useStore } from '@src/config/configure-store';
import { createUseStyle } from '@src/config/theme';
import { throttle } from 'lodash';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { NoteCard } from './note-card';

export function NotesList() {
  const { styles } = useStyle();
  const { state } = useStore();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(300);

  React.useLayoutEffect(() => {
    const adjustHeight = () => {
      const containerHeight = containerRef.current?.clientHeight;
      if (containerHeight) setHeight(Math.max(300, containerHeight));
    };
    adjustHeight();

    const throttledAdjustHeight = throttle(adjustHeight, 500);
    window.addEventListener('resize', throttledAdjustHeight);
    return () => {
      window.removeEventListener('resize', throttledAdjustHeight);
    };
  }, [containerRef]);

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
