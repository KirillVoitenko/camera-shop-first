import { Fallback } from '../fallback';
import { render } from '@testing-library/react';

const FALLBACK_TEST_ID = 'fallback-container';
const SPINNER_TEST_ID = 'spinner';

describe('Component \'Fallback\'', () => {
  it('should correct render', () => {
    const screen = render(<Fallback />);

    expect(screen.getByTestId(FALLBACK_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SPINNER_TEST_ID)).toBeInTheDocument();
  });
});
