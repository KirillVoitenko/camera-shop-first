import { Content } from '../content';
import { render } from '@testing-library/react';
import faker from 'faker';
import { withRouter } from '@test-utills/wrappers';

const CONTENT_TAG_NAME = 'main';

const FAKE_CONTENT_CLASSNAME = faker.lorem.word();
const FAKE_CHILD_TEXT = faker.lorem.paragraph();
const FAKE_SUBHEADER_TEXT = faker.lorem.paragraph();


describe('Component \'Content\'', () => {
  it('should correct render without props', () => {
    const screen = render(withRouter(<Content />));
    const element = screen.container.querySelector(CONTENT_TAG_NAME);

    expect(element).not.toBeNull();
  });

  it('should correct render with \'subHeader\' prop', () => {
    const screen = render(withRouter(<Content subHeader={FAKE_SUBHEADER_TEXT}/>));

    expect(screen.getByText(FAKE_SUBHEADER_TEXT)).toBeInTheDocument();
  });

  it('should correct append custom classname', () => {
    const screen = render(withRouter(<Content className={FAKE_CONTENT_CLASSNAME}/>));
    const element = screen.container.querySelector(CONTENT_TAG_NAME);

    expect(element).not.toBeNull();
    expect(element?.classList.contains(FAKE_CONTENT_CLASSNAME)).toBeTruthy();
  });

  it('should render \'Breadcrumbs\'', () => {
    const breadcrumbsContainerTestId = 'breadcrumbs-container';
    const screen = render(withRouter(<Content />));
    expect(screen.getByTestId(breadcrumbsContainerTestId)).toBeInTheDocument();
  });

  it('should correct render with \'children\'', () => {
    const screen = render(withRouter(
      <Content>
        {FAKE_CHILD_TEXT}
      </Content>
    ));

    expect(screen.getByText(FAKE_CHILD_TEXT)).toBeInTheDocument();
  });
});
