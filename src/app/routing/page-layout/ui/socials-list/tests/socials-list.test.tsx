import { render } from '@testing-library/react';
import { SocialsList } from '../socials-list';
import { SOCIALS_LIST_TEST_ID } from '@app/routing/page-layout/config/const';
import { SOCIALS_NAVIGATION_CONFIG } from '@app/routing/page-layout/config/navigation';
import { withRouter } from '@test-utills/wrappers';

describe('Component \'SocialsList\'', () => {
  it('should correct render', () => {
    const screen = render(withRouter(<SocialsList />));

    expect(screen.getByTestId(SOCIALS_LIST_TEST_ID)).toBeInTheDocument();
  });

  it.each(SOCIALS_NAVIGATION_CONFIG)(
    'item $iconLink should exists', ({ iconLink }) => {
      const screen = render(withRouter(<SocialsList />));
      const socialIconsLinks = Array.from(screen.container.querySelectorAll('use')).map((current) => current.getAttribute('xlink:href'));

      expect(socialIconsLinks.includes(iconLink)).toBeTruthy();
    }
  );
});
