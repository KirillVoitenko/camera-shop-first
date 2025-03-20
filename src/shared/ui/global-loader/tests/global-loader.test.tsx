import { GlobalLoader } from '../global-loader';
import { render } from '@testing-library/react';

type LoadingSelectorType = () => boolean;

vi.mock('@shared/lib/store', () => ({
  useAppSelector: vi.fn<[LoadingSelectorType], boolean>((selector) => selector())
}));

describe('Component GlobalLoader', () => {
  const loaderContainerTestId = 'global-loader-container';
  const spinnerTestId = 'spinner';
  const falseReturnSelectorMock = vi.fn(() => false);
  const trueReturnSelectorMock = vi.fn(() => true);

  it('shold correct render with no loading', () => {
    const screen = render(
      <GlobalLoader
        productListLoadingSelector={falseReturnSelectorMock}
        productPageLoadingSelector={falseReturnSelectorMock}
      />);

    expect(screen.queryByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(spinnerTestId)).toBeNull();
  });

  it('shold correct render with products list is loading', () => {
    const screen = render(
      <GlobalLoader
        productListLoadingSelector={trueReturnSelectorMock}
        productPageLoadingSelector={falseReturnSelectorMock}
      />);

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('shold correct render with product page is loading', () => {
    const screen = render(
      <GlobalLoader
        productListLoadingSelector={falseReturnSelectorMock}
        productPageLoadingSelector={trueReturnSelectorMock}
      />);

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });
});
