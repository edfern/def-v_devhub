import { Fragment } from 'react';

import { CircleSpinner } from 'react-spinners-kit';

export const LoadingSpinner = ({ color, styles }) => {
  return (
    <Fragment>
      <div className={`spinner-loading ${styles}`}>
        <CircleSpinner color={color || '#13293D'} />
      </div>
    </Fragment>
  );
};
