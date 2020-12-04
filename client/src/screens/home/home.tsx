import { MainTemplate } from '@src/components/templates/main-template';
import { useI18n } from '@src/config/create-i18n-context';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function Home() {
  const { styles } = useStyle();
  const { translations } = useI18n();

  return (
    <MainTemplate
      title={() => {
        return <div style={styles.titleWrapper}>{translations.title}</div>;
      }}
    >
      Hello there!
    </MainTemplate>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  stepper: {
    marginBottom: dimensions.gutterMedium,
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
