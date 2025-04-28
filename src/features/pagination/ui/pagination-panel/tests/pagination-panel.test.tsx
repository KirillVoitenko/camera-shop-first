import { PaginationPanel } from '../pagination-panel';
import { render } from '@testing-library/react';
import faker from 'faker';
import { MAX_PAGE_LINKS } from '@features/pagination/config/const';

const PREVIOUS_PAGE_LINK_PATTERN = /назад/gmi;
const NEXT_PAGE_LINK_PATTERN = /далее/gmi;
const PAGE_LINK_PATTERN = /^\d*$/gm;

describe('component \'PaginationPanel\'', () => {
  it('should correct render if max rendered links >= pages count and first page is active', () => {
    const pagesCount = faker.datatype.number({min: 2, max: 10});
    const maxRenderedLinks = pagesCount + 1;
    const screen = render(
      <PaginationPanel
        activePage={1}
        maxRenderedLinks={maxRenderedLinks}
        pagesCount={pagesCount}
        onLinkClick={vi.fn()}
      />
    );

    expect(screen.getAllByText(PAGE_LINK_PATTERN, {selector: 'a'}).length).toBe(pagesCount);
    expect(screen.queryByText(PREVIOUS_PAGE_LINK_PATTERN)).toBeNull();
    expect(screen.queryByText(NEXT_PAGE_LINK_PATTERN)).toBeNull();
  });

  it('should correct render if max rendered links <= pages count and first page is active', () => {
    const pagesCount = faker.datatype.number({min: 2, max: 10});
    const maxRenderedLinks = pagesCount - 1;
    const screen = render(
      <PaginationPanel
        activePage={1}
        maxRenderedLinks={maxRenderedLinks}
        pagesCount={pagesCount}
        onLinkClick={vi.fn()}
      />
    );

    expect(screen.getAllByText(PAGE_LINK_PATTERN, {selector: 'a'}).length).toBe(maxRenderedLinks);
    expect(screen.getByText(NEXT_PAGE_LINK_PATTERN, {selector: 'a'})).toBeInTheDocument();
    expect(screen.queryByText(PREVIOUS_PAGE_LINK_PATTERN, {selector: 'a'})).toBeNull();
  });

  it('should correct render if max rendered links <= pages count and last page is active', () => {
    const pagesCount = faker.datatype.number({min: 2, max: 10});
    const maxRenderedLinks = pagesCount - 1;
    const screen = render(
      <PaginationPanel
        activePage={pagesCount}
        maxRenderedLinks={maxRenderedLinks}
        pagesCount={pagesCount}
        onLinkClick={vi.fn()}
      />
    );

    expect(screen.getAllByText(PAGE_LINK_PATTERN, {selector: 'a.pagination__link'}).length).toBe(maxRenderedLinks);
    expect(screen.queryByText(NEXT_PAGE_LINK_PATTERN, {selector: 'a'})).toBeNull();
    expect(screen.getByText(PREVIOUS_PAGE_LINK_PATTERN, {selector: 'a'})).toBeInTheDocument();
  });

  it('should correct render if max rendered links <= pages count and random page is active', () => {
    const pagesCount = faker.datatype.number({min: 10, max: 10});
    const maxRenderedLinks = MAX_PAGE_LINKS;
    const screen = render(
      <PaginationPanel
        activePage={2}
        maxRenderedLinks={maxRenderedLinks}
        pagesCount={pagesCount}
        onLinkClick={vi.fn()}
      />
    );

    expect(screen.getAllByText(PAGE_LINK_PATTERN, {selector: 'a'}).length).toBe(maxRenderedLinks);
    expect(screen.getByText(NEXT_PAGE_LINK_PATTERN, {selector: 'a'})).toBeInTheDocument();
    expect(screen.getByText(PREVIOUS_PAGE_LINK_PATTERN, {selector: 'a'})).toBeInTheDocument();
  });
});
