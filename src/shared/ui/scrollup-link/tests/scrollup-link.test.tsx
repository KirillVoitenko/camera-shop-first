import { render } from '@testing-library/react';
import { ScrollupLink } from '../scrollup-link';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

const SCROLL_BY_MOCK = vi.fn();
const FAKE_ELEMENT_ID = `#${faker.lorem.word()}`;
const FAKE_SCROLL_TARGET_TEXT = faker.lorem.sentence();
const LINK_TEST_ID = 'scrollup-link';
const FAKE_SCROLL_TARGET = <p className={FAKE_ELEMENT_ID}>{FAKE_SCROLL_TARGET_TEXT}</p>;

describe('Component \'ScrollupLink\'', () => {
  beforeEach(() => {
    SCROLL_BY_MOCK.mockReset();
  });

  it('should correct render', () => {
    const screen = render(<ScrollupLink elementId={FAKE_ELEMENT_ID} />);

    expect(screen.getByTestId(LINK_TEST_ID)).toBeInTheDocument();
  });

  it('should scroll by click and exists scroll element', async () => {
    vi.spyOn(window, 'scrollBy').mockImplementationOnce(SCROLL_BY_MOCK);
    const screen = render(
      <>
        {FAKE_SCROLL_TARGET}
        <ScrollupLink elementId={FAKE_ELEMENT_ID} />
      </>);

    const element = screen.getByTestId(LINK_TEST_ID);
    vi.spyOn(document, 'querySelector').mockImplementationOnce(() => screen.getByText(FAKE_SCROLL_TARGET_TEXT));

    await userEvent.click(element);

    expect(SCROLL_BY_MOCK).toBeCalled();
  });

  it('should scroll by click and exists scroll element', async () => {
    vi.spyOn(window, 'scrollBy').mockImplementationOnce(SCROLL_BY_MOCK);
    const screen = render(
      <>
        {FAKE_SCROLL_TARGET}
        <ScrollupLink elementId={FAKE_ELEMENT_ID} />
      </>);

    const element = screen.getByTestId(LINK_TEST_ID);
    vi.spyOn(document, 'querySelector').mockImplementationOnce(() => null);

    await userEvent.click(element);

    expect(SCROLL_BY_MOCK).not.toBeCalled();
  });
});
