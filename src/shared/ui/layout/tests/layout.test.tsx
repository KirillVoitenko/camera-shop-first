import { Layout } from '../layout';
import { render } from '@testing-library/react';
import faker from 'faker';

const LAYOUT_TEST_ID = 'layout-container';
const DEFAULT_CLASSNAME = 'wrapper';
const FAKE_LAYOUT_CLASSNAME = faker.lorem.word();
const FAKE_LAYOUT_TEXT = faker.lorem.paragraph();

describe('Component \'Layout\'', () => {
  it('should correct render without props', () => {
    const screen = render(<Layout />);

    const element = screen.getByTestId(LAYOUT_TEST_ID);

    expect(element).toBeInTheDocument();
    expect(element.classList.contains(DEFAULT_CLASSNAME)).toBeTruthy();
  });

  it('should correct append custom classname', () => {
    const screen = render(<Layout className={FAKE_LAYOUT_CLASSNAME}/>);
    const element = screen.getByTestId(LAYOUT_TEST_ID);

    expect(element).not.toBeNull();
    expect(element.classList.contains(FAKE_LAYOUT_CLASSNAME)).toBeTruthy();
  });

  it('should correct render with \'children\'', () => {
    const screen = render(
      <Layout>
        {FAKE_LAYOUT_TEXT}
      </Layout>
    );

    expect(screen.getByText(FAKE_LAYOUT_TEXT)).toBeInTheDocument();
  });
});
