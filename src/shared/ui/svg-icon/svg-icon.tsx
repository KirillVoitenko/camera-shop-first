import { ElementSize } from '@shared/model/html';
import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';

type SvgIconProps = Classed<{
  size: ElementSize;
  isAriaHidden?: boolean;
  xlinkHref: string;
  testId?: string;
}>

export function SvgIcon({ xlinkHref, size, className, isAriaHidden = true, testId = 'svg-icon' }: SvgIconProps): JSX.Element {
  return (
    <svg className={className} width={size.width} height={size.height} aria-hidden={isAriaHidden} data-testid={testId}>
      <use xlinkHref={xlinkHref} />
    </svg>
  );
}
