import { FormBloc, FormEvents } from '@src/blocs/form';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export function FileFormField<T, R>(props: {
  id: keyof T;
  bloc: FormBloc<T, R>;
  label: string;
  obscure?: boolean;
}) {
  const value = (props.bloc.getValue(props.id) as any) as File | undefined;
  const { styles } = useStyle();

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      props.bloc.dispatch(new FormEvents.Update(props.id, acceptedFiles[0]));
    },
    [props.bloc, props.id]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div style={styles.container} {...getRootProps()}>
      <input {...getInputProps()} />
      {value ? value.name : 'Upload setup'}
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    ...shared.typography.action(),
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    marginBottom: dimensions.gutterLarge,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.active.weak,
    borderRadius: dimensions.radiusSmall,
    padding: dimensions.gutterMedium,
  },
}));
