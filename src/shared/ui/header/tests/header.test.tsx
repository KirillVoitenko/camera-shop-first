import { Header } from '../header';
import { render } from '@testing-library/react';
import faker from 'faker';

type IDAttribute = {
  name: 'id';
  value: string;
}

const createIdAttribute = (value: string): IDAttribute => ({
  name: 'id',
  value,
});

const HEADER_TAG_NAME = 'header';
const FAKE_HEADER_ID: IDAttribute = createIdAttribute(faker.lorem.word());
const DEFAULT_HEADER_ID: IDAttribute = createIdAttribute('header');

const FAKE_HEADER_CLASSNAME = faker.lorem.word();
const FAKE_CHILD_TEXT = faker.lorem.paragraph();

describe('Component \'Header\'', () => {
  it('should correct render without props', () => {
    const screen = render(<Header />);
    const element = screen.container.querySelector(HEADER_TAG_NAME);

    expect(element).not.toBeNull();
    expect(element?.getAttribute(DEFAULT_HEADER_ID.name)).toBe(DEFAULT_HEADER_ID.value);
  });

  it('should correct replace \'id\' attribute', () => {
    const screen = render(<Header id={FAKE_HEADER_ID.value}/>);
    const element = screen.container.querySelector(HEADER_TAG_NAME);

    expect(element).not.toBeNull();
    expect(element?.getAttribute(FAKE_HEADER_ID.name)).toBe(FAKE_HEADER_ID.value);
  });

  it('should correct append custom classname', () => {
    const screen = render(<Header className={FAKE_HEADER_CLASSNAME}/>);
    const element = screen.container.querySelector(HEADER_TAG_NAME);

    expect(element).not.toBeNull();
    expect(element?.classList.contains(FAKE_HEADER_CLASSNAME)).toBeTruthy();
  });

  it('should correct render with \'children\'', () => {
    const screen = render(
      <Header id={FAKE_HEADER_ID.value}>
        {FAKE_CHILD_TEXT}
      </Header>
    );

    expect(screen.getByText(FAKE_CHILD_TEXT)).toBeInTheDocument();
  });
});
