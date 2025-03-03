import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/wrappers';
import { HEADER_NAVIGATION_TEST_ID } from '../../../config/const';
import { MAIN_NAVIGATION_CONFIG } from '../../../config/navigation';
import { HeaderNavigation } from '../header-navigation';
import { MemoryHistory, createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Component \'HeaderNavigation\'', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should correct render', () => {
    const screen = render(withRouter(<HeaderNavigation />));

    expect(screen.getByTestId(HEADER_NAVIGATION_TEST_ID)).toBeInTheDocument();
  });

  describe.each(MAIN_NAVIGATION_CONFIG)(
    'navigation item $desctription', ({desctription, path}) => {
      it('should exists', () => {
        const screen = render(withRouter(<HeaderNavigation />));

        expect(screen.getByText(desctription)).toBeInTheDocument();
      });

      it(`should navigate into '${ path.toString() }' route by click`, async () => {
        const screen = render(withRouter(<HeaderNavigation />, history));
        const itemElement = screen.getByText(desctription);
        await userEvent.click(
          itemElement
        );

        expect(history.location.pathname).toBe(path);
      });
    }
  );
});
