import { ElementSize } from '@shared/model/html';
import { SvgIcon } from '@shared/ui/svg-icon';
import classNames from 'classnames';
import { CSSProperties, JSX, forwardRef, PropsWithRef } from 'react';

export type ArrowType = 'next' | 'previous';

type ArrowProps = PropsWithRef<{
  type: ArrowType;
}>

const BUTTON_STYLES: CSSProperties = {
  zIndex: 3,
  pointerEvents: 'auto'
};

const ARROW_SIZE: ElementSize = {
  height: 12,
  width: 7
};

export const Arrow = forwardRef<HTMLButtonElement, ArrowProps>(({ type }, ref): JSX.Element => {
  const buttonClassName = classNames(
    'slider-controls',
    {
      'slider-controls--prev': type === 'previous',
      'slider-controls--next': type === 'next',
    }
  );

  const labelText = type === 'next' ? 'Следующий слайд' : 'Предыдущий слайд';

  return (
    <button
      ref={ref}
      className={buttonClassName}
      type='button'
      aria-label={labelText}
      style={BUTTON_STYLES}
      data-testid='swiper-arrow'
    >
      <SvgIcon size={ARROW_SIZE} xlinkHref='#icon-arrow' />
    </button>
  );
});

Arrow.displayName = 'SimilarProductsSliderArrow';
