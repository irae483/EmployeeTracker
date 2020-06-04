import React from 'react';
import { GridLoader } from 'react-spinners';
import Loader, { Props as LoaderProps } from 'react-loader-advanced';

export interface PendingWrapperProps extends LoaderProps {
  spinnerCSS?: string;
}

export const PendingWrapper = (props: PendingWrapperProps) => {
  const loadingSpinner =
    <span>
      <GridLoader
        css={`${props.spinnerCSS || ""} margin-left: auto; margin-right: auto;`}
        size={30}
      />
    </span>;

  return (
    <Loader
      message={loadingSpinner}
      {...props}
    >
      {props.children}
    </Loader>
  )
}