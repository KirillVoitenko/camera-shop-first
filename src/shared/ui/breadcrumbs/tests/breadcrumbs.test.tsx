import { render } from '@testing-library/react';
import { Breadcrumbs } from '../breadcrumbs';
import { Breadcrumb } from '../types';
import faker from 'faker';
import { withRouter } from '@test-utills/wrappers';

const CONTAINER_TEST_ID = 'breadcrumbs-container';
const ITEM_TEST_ID = 'breadcrumbs-item';
const MAIN_CRUMB_TEXT_PATTERN = /главная/gi;

const CRUMBS: Breadcrumb[] = Array.from({length: faker.datatype.number({max: 10})}).map((_, index) => ({
  link: faker.internet.url(),
  position: index,
  title: faker.lorem.word()
}));

describe('Component \'Breadcrumbs\'', () => {
  it('should correct render', () => {
    const screen = render(withRouter(<Breadcrumbs crumbs={CRUMBS} />));

    expect(screen.getByTestId(CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.getAllByTestId(ITEM_TEST_ID).length).toBe(CRUMBS.length + 1);
  });

  it('should render \'Main\' crumb', () => {
    const screen = render(withRouter(<Breadcrumbs />));

    expect(screen.getByText(MAIN_CRUMB_TEXT_PATTERN)).toBeInTheDocument();
  });
});
