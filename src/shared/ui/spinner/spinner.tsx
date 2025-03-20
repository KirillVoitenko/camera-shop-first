import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';

type SpinnerProps = Classed<{
  isActive: boolean;
}>

export function Spinner({ className, isActive }: SpinnerProps): JSX.Element {
  const spinnerClassName = classNames('loader-spin', className);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isActive && <div className={spinnerClassName} data-testid='spinner' />}
    </>
  );
}
