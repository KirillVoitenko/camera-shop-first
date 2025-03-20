import { withHelmet, withRouter } from '@test-utills/wrappers';
import { render } from '@testing-library/react';
import { NotFoundPageWithTitle as NotFoundPage } from '../not-found-page';
import { JSX } from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoutesEnum } from '@shared/model/enums';
import userEvent from '@testing-library/user-event';

const renderPage = (history?: MemoryHistory): JSX.Element => withHelmet(withRouter(<NotFoundPage />, history));
const PAGE_TEXT = 'Запрашиваемой страницы не существует';
const LINK_TEXT = 'На главную';

describe('Component \'NotFoundPage\'', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(AppRoutesEnum.NotFound);
  });

  it('should correct render', () => {
    const screen = render(renderPage(history));

    expect(screen.getByText(PAGE_TEXT)).toBeInTheDocument();
    expect(screen.getByText(LINK_TEXT)).toBeInTheDocument();
  });

  it('should navigate to Main by link click', async () => {
    const screen = render(renderPage(history));

    await userEvent.click(screen.getByText(LINK_TEXT));

    expect(history.location.pathname).toBe(AppRoutesEnum.Main);
  });
});
