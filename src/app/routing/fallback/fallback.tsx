import { Spinner } from '@shared/ui/spinner';
import { JSX } from 'react';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';

type FallbackProps = Classed<Record<string, never>>;

export function Fallback({ className }: FallbackProps): JSX.Element {
  const loaderClassName = classNames('loader-container', 'loader-container--active', className);
  return (
    <div className={loaderClassName} data-testid='fallback-container'>
      <Spinner isActive />
    </div>
  );
}
