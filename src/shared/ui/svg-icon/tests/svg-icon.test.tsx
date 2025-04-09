import { SvgIcon } from '../svg-icon';
import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import faker from 'faker';

const SVG_TEST_ID = 'svg-icon';

const FAKE_PROPS: ComponentProps<typeof SvgIcon> = {
  size: {
    height: faker.datatype.number({min: 1, max: 10}),
    width: faker.datatype.number({min: 1, max: 10}),
  },
  xlinkHref: faker.datatype.string(),
};

describe('Component \'SvgIcon\'', () => {
  it('should correct render', () => {
    const screen = render(<SvgIcon {...FAKE_PROPS} />);

    expect(screen.getByTestId(SVG_TEST_ID)).toBeInTheDocument();
  });
});
