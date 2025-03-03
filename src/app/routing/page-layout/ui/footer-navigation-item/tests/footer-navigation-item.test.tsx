import { render } from '@testing-library/react';
import { NavigationItem } from '@app/routing/page-layout/model/navigation';
import faker from 'faker';
import { FooterNavigationItem } from '../footer-navigation-item';

const ITEMS_MOCK: NavigationItem[] = Array.from({length: faker.datatype.number({max: 10})}).map<NavigationItem>((_, index) => ({
  id: index,
  desctription: faker.lorem.sentence(),
  path: faker.internet.url()
}));

const FAKE_TITLE = faker.lorem.word();

describe('Component \'FooterNavigationItem\'', () => {
  const renderItemMock = vi.fn();

  beforeEach(() => {
    renderItemMock.mockReset();
  });

  it('should correct render', () => {
    const testId = faker.lorem.word();
    const screen = render(
      <FooterNavigationItem
        items={ITEMS_MOCK}
        testId={testId}
        title={FAKE_TITLE}
        renderItem={renderItemMock}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText(FAKE_TITLE)).toBeInTheDocument();
    expect(renderItemMock).toBeCalledTimes(ITEMS_MOCK.length);
  });
});
