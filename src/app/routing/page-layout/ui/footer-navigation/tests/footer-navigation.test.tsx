import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/wrappers';
import { FooterNavigation } from '../footer-navigation';
import {
  FOOTER_NAVIGATION_TEST_ID,
  FooterNavigationPartsTestIds
} from '@app/routing/page-layout/config/const';
import {
  MAIN_NAVIGATION_CONFIG
} from '@app/routing/page-layout/config/navigation';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

type NavigationBlock = {
  name: string;
  testId: FooterNavigationPartsTestIds;
}

const NAVIGATION_BLOCKS: NavigationBlock[] = [
  {
    name: 'Main',
    testId: FooterNavigationPartsTestIds.Main,
  },
  {
    name: 'Resources',
    testId: FooterNavigationPartsTestIds.Resources,
  },
  {
    name: 'Support',
    testId: FooterNavigationPartsTestIds.Support,
  }
];

describe('Component \'FooterNavigation\'', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should correct render', () => {
    const screen = render(withRouter(<FooterNavigation />));

    expect(screen.getByTestId(FOOTER_NAVIGATION_TEST_ID)).toBeInTheDocument();
  });

  it.each(NAVIGATION_BLOCKS)(
    'block $name should exists', ({ testId }) => {
      const screen = render(withRouter(<FooterNavigation />));

      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  );

  it.each(MAIN_NAVIGATION_CONFIG)(
    'main navigation is works by $desctription', async ({ desctription, path }) => {
      const screen = render(withRouter(<FooterNavigation />, history));

      await userEvent.click(
        screen.getByText(desctription)
      );

      expect(history.location.pathname).toBe(path);
    }
  );
});
