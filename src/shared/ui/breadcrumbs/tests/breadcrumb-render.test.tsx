import { render } from '@testing-library/react';
import { Breadcrumb } from '../types';
import faker from 'faker';
import { withRouter } from '@test-utills/wrappers';
import { breadcrumbRender } from '../breadcrumb-render';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const CRUMB_MOCK: Breadcrumb = {
  link: '/test',
  position: faker.datatype.number(),
  title: faker.lorem.word(),
  isActive: faker.datatype.boolean()
};

describe('Function \'breadcrumbRender\'', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace('/');
  });

  it('should correct JSX return if inactive breadcrumb', () => {
    CRUMB_MOCK.isActive = false;
    const screen = render(withRouter(breadcrumbRender(CRUMB_MOCK), history));

    expect(screen.getByText(CRUMB_MOCK.title)).toBeInTheDocument();
  });

  it('should not redirect if inactive breadcrumb', async () => {
    CRUMB_MOCK.isActive = false;
    const screen = render(withRouter(breadcrumbRender(CRUMB_MOCK), history));

    const element = screen.getByText(CRUMB_MOCK.title);

    await userEvent.click(element);

    expect(history.location.pathname).toBe(CRUMB_MOCK.link);
  });

  it('should correct JSX return if active breadcrumb', () => {
    CRUMB_MOCK.isActive = true;
    const screen = render(withRouter(breadcrumbRender(CRUMB_MOCK), history));

    expect(screen.getByText(CRUMB_MOCK.title)).toBeInTheDocument();
  });

  it('should not redirect if inactive breadcrumb', async () => {
    CRUMB_MOCK.isActive = true;
    const screen = render(withRouter(breadcrumbRender(CRUMB_MOCK), history));

    const element = screen.getByText(CRUMB_MOCK.title);

    await userEvent.click(element);

    expect(history.location.pathname).not.toBe(CRUMB_MOCK.link);
  });
});
