import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/wrappers';
import { PageFooter } from '../page-footer';
import {
  LOGO_TEST_ID,
  FOOTER_NAVIGATION_TEST_ID,
  SOCIALS_LIST_TEST_ID
} from '../../../config/const';

const FOOTER_TEXT = 'Интернет-магазин фото- и видеотехники';

describe('Component \'PageFooter\'', () => {
  it('should correct render', () => {
    const screen = render(withRouter(<PageFooter />));

    expect(screen.getByTestId(LOGO_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(FOOTER_TEXT)).toBeInTheDocument();
    expect(screen.getByTestId(SOCIALS_LIST_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FOOTER_NAVIGATION_TEST_ID)).toBeInTheDocument();
  });
});
