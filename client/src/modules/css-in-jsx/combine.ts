import React from 'react';

export function combine(styles: (React.CSSProperties | undefined | null)[]) {
  return styles
    .filter((style) => !!style)
    .reduce((acc, style) => {
      return { ...acc, ...style };
    }, {} as React.CSSProperties)!;
}
