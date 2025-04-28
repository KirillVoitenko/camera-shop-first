import { INITIAL_PAGE_PARAMS, MAX_ITEMS_IN_ONE_PAGE, PaginationTestId } from '@features/pagination/config/const';
import { Pagination } from '../pagination';
import { render } from '@testing-library/react';
import { getItemsByPage } from '@features/pagination/lib/get-items-by-page';
import { withRouter } from '@test-utills/wrappers';

const ITEMS_LENGTH = 10;

const generateFakeItems = () => Array.from({ length: ITEMS_LENGTH }).map((_, index) => index);

const fakeChildrenProp = <TItemType,>(items: TItemType[]): JSX.Element => (
  <>
    {items.map((current, index) => {
      const itemKey = `fake-item-card-${index}`;
      return (
        <div key={itemKey}>
          {String(current)}
        </div>
      );
    })}
  </>
);

describe('component \'Pagination\'', () => {
  it('should correct render if items <= max items in one page', () => {
    const fakeItems = generateFakeItems();
    const screen = render(
      withRouter(
        <Pagination
          itemsOnPageCount={fakeItems.length}
          items={fakeItems}
        >
          {fakeChildrenProp}
        </Pagination>
      ));

    expect(screen.queryByTestId(PaginationTestId.Pagination)).toBeNull();
  });

  it('should correct render if items > max items in one page', () => {
    const fakeItems = generateFakeItems();
    const screen = render(
      withRouter(
        <Pagination
          itemsOnPageCount={Math.round(fakeItems.length / 2)}
          items={fakeItems}
        >
          {fakeChildrenProp}
        </Pagination>
      ));

    expect(screen.getByTestId(PaginationTestId.Pagination)).toBeInTheDocument();
  });

  it('should call \'getItemsByPage\' function', async () => {
    const fakeItems = generateFakeItems();
    const getItemsByPageParams: Parameters<typeof getItemsByPage<number>> = [fakeItems, INITIAL_PAGE_PARAMS.page, MAX_ITEMS_IN_ONE_PAGE];
    const getItemsSpy = vi.spyOn(await import('@features/pagination/lib/get-items-by-page'), 'getItemsByPage');
    render(
      withRouter(
        <Pagination
          items={fakeItems}
        >
          {fakeChildrenProp}
        </Pagination>
      ));

    expect(getItemsSpy).lastCalledWith(...getItemsByPageParams);
  });
});
