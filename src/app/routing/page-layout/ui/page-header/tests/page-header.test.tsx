import { render } from '@testing-library/react';
import { PageHeader } from '../page-header';
import { withRouter } from '@test-utills/wrappers';
import {
  PAGE_HEADER_TEST_ID,
  HEADER_NAVIGATION_TEST_ID,
  LOGO_TEST_ID
} from '@app/routing/page-layout/config/const';

describe('Component \'PageHeader\'', () => {
  it('should correct render', () => {
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByTestId(PAGE_HEADER_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'Logo\' component', () => {
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByTestId(LOGO_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'HeaderNav\' component', () => {
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByTestId(HEADER_NAVIGATION_TEST_ID)).toBeInTheDocument();
  });
});
