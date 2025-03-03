import { Logo } from '../logo';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withRouter } from '@test-utills/wrappers';
import { LogoIconClassName, LOGO_TEST_ID } from '../const';
import userEvent from '@testing-library/user-event';
import { AppRoutesEnum } from '@shared/model/enums';

describe('Component \'Logo\'', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory({initialEntries: ['/initial']});
  });

  it('should correct render by header', () => {
    const screen = render(withRouter(<Logo type='header'/>));

    expect(screen.getByTestId(LOGO_TEST_ID)).toBeInTheDocument();
    expect(screen.container.querySelector(`.${LogoIconClassName.Header}`)).not.toBeNull();
  });

  it('should correct render by footer', () => {
    const screen = render(withRouter(<Logo type='footer'/>));

    expect(screen.getByTestId(LOGO_TEST_ID)).toBeInTheDocument();
    expect(screen.container.querySelector(`.${LogoIconClassName.Footer}`)).not.toBeNull();
  });

  it('should navigate into \'Main\' route by click', async () => {
    const screen = render(withRouter(<Logo type='header'/>, history));

    await userEvent.click(
      screen.getByTestId(LOGO_TEST_ID)
    );

    expect(history.location.pathname).toBe(AppRoutesEnum.Main);
  });

  it('should navigate into custom route by click and \'to\' prop defined', async () => {
    const customRoute = '/custom-route';
    const screen = render(withRouter(<Logo type='header' to={customRoute}/>, history));

    await userEvent.click(
      screen.getByTestId(LOGO_TEST_ID)
    );

    expect(history.location.pathname).toBe(customRoute);
  });
});
