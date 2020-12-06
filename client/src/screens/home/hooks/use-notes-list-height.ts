import { throttle } from 'lodash';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useNotesListHeight() {
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

    const resizeObserver = new ResizeObserver(adjustHeight);
    resizeObserver.observe(document.getElementById('notes-form-wrapper')!);

    return () => {
      window.removeEventListener('resize', adjustHeight);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return { containerRef, height };
}
