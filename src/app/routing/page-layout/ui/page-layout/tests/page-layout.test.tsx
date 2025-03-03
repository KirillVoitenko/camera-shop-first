import { render } from '@testing-library/react';
import { PageLayout } from '../page-layout';
import {
  PAGE_HEADER_TEST_ID,
  LAYOUT_TEST_ID,
  PAGE_FOOTER_TEST_ID
} from '@app/routing/page-layout/config/const';
import { withRouter } from '@test-utills/wrappers';

describe('Component \'PageLayout\'', () => {
  it('should render \'Layout\' component', () => {
    const screen = render(withRouter(<PageLayout />));
    expect(screen.getByTestId(LAYOUT_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'PageHeader\' component', () => {
    const screen = render(withRouter(<PageLayout />));
    expect(screen.getByTestId(PAGE_HEADER_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'PageFooter\' component', () => {
    const screen = render(withRouter(<PageLayout />));
    expect(screen.getByTestId(PAGE_FOOTER_TEST_ID)).toBeInTheDocument();
  });
});
