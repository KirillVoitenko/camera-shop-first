import { Spinner } from '../spinner';
import { render } from '@testing-library/react';


describe('Component \'Spinner\'', () => {
  const spinnerTestId = 'spinner';

  it('should correct render with is active', () => {
    const screen = render(<Spinner isActive />);

    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('should correct render with no active', () => {
    const screen = render(<Spinner isActive={false} />);

    expect(screen.queryByTestId(spinnerTestId)).toBeNull();
  });
});
