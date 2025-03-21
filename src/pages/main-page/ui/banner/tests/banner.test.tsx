import { render } from '@testing-library/react';
import { Banner } from '../banner';
import { BANNER_TEST_ID } from '@pages/main-page/config/const';

describe('Component \'Banner\'', () => {
  it('should correct render', () => {
    const screen = render(<Banner />);

    expect(screen.getByTestId(BANNER_TEST_ID)).toBeInTheDocument();
  });
});
