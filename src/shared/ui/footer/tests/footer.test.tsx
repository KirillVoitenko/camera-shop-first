import { Footer } from '../footer';
import { render } from '@testing-library/react';
import faker from 'faker';

const FOOTER_TAG_NAME = 'footer';
const FAKE_FOOTER_CLASSNAME = faker.lorem.word();
const FAKE_FOOTER_TEXT = faker.lorem.paragraph();

describe('Component \'Footer\'', () => {
  it('should correct render without props', () => {
    const screen = render(<Footer />);
    const element = screen.container.querySelector(FOOTER_TAG_NAME);

    expect(element).not.toBeNull();
  });

  it('should correct append custom classname', () => {
    const screen = render(<Footer className={FAKE_FOOTER_CLASSNAME}/>);
    const element = screen.container.querySelector(FOOTER_TAG_NAME);

    expect(element).not.toBeNull();
    expect(element?.classList.contains(FAKE_FOOTER_CLASSNAME)).toBeTruthy();
  });

  it('should correct render with \'children\'', () => {
    const screen = render(
      <Footer>
        {FAKE_FOOTER_TEXT}
      </Footer>
    );

    expect(screen.getByText(FAKE_FOOTER_TEXT)).toBeInTheDocument();
  });
});
