import { render } from '@testing-library/react';
import { Arrow, ArrowType } from '../arrow';

type EachArg = {
  cssSelector: string;
  arrowType: ArrowType;
}

const EACH_ARGS: EachArg[] = [
  { cssSelector: 'button.slider-controls--prev', arrowType: 'previous' },
  { cssSelector: 'button.slider-controls--next', arrowType: 'next' }
];

describe('Component \'Arrow\'', () => {
  it.each(EACH_ARGS)('should correct render by $arrowType mode', ({ cssSelector, arrowType }) => {
    const screen = render(<Arrow type={arrowType} />);

    expect(screen.container.querySelector(cssSelector)).toBeInTheDocument();
  });
});
