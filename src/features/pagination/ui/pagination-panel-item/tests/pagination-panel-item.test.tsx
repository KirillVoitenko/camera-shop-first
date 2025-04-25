import { ComponentProps } from 'react';
import { PaginationPanelItem } from '../pagination-panel-item';
import { render } from '@testing-library/react';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { PaginationTestId } from '@features/pagination/config/const';


type PanelItemProps = ComponentProps<typeof PaginationPanelItem>;

const generatePanelItemProps = (isActive = false): PanelItemProps => ({
  description: faker.lorem.word(),
  onClick: vi.fn(),
  pageNumber: faker.datatype.number(),
  isActive
});

describe('component \'PaginationPanelItem\'', () => {
  it('should correct render', () => {
    const panelItemProps = generatePanelItemProps();
    const screen = render(<PaginationPanelItem {...panelItemProps} />);

    expect(screen.getByTestId(PaginationTestId.PanelItem)).toBeInTheDocument();
    expect(screen.getByText(panelItemProps.description)).toBeInTheDocument();
  });

  it('should call \'onClick\' callback by click on not active panel item', async () => {
    const panelItemProps = generatePanelItemProps();
    const screen = render(<PaginationPanelItem {...panelItemProps} />);

    await userEvent.click(screen.getByText(panelItemProps.description));

    expect(panelItemProps.onClick).toBeCalledTimes(1);
    expect(panelItemProps.onClick).toBeCalledWith(panelItemProps.pageNumber);
  });

  it('should not call \'onClick\' callback by click on active panel item', async () => {
    const panelItemProps = generatePanelItemProps(true);
    const screen = render(<PaginationPanelItem {...panelItemProps} />);

    await userEvent.click(screen.getByText(panelItemProps.description));

    expect(panelItemProps.onClick).not.toBeCalled();
  });
});
