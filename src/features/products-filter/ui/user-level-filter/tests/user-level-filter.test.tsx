import { FilterFormValue } from '@features/products-filter/model/types';
import { render } from '@testing-library/react';
import { UseFormRegister } from 'react-hook-form';
import { UserLevelFilter } from '../user-level-filter';
import userEvent from '@testing-library/user-event';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';

interface BaseEachArg {
  field: keyof FilterFormValue;
}

interface RenderTestEachArg extends BaseEachArg {
  field: keyof FilterFormValue;
  searchText: RegExp;
}

type ClickableTestEachArg = BaseEachArg;

const FORM_REGISTER_MOCK_IMPLEMENTATION: UseFormRegister<FilterFormValue> = (name) => ({name, onBlur: vi.fn(), onChange: vi.fn(), ref: vi.fn()});

describe('component \'UserLevelFilter\'', () => {
  it('should rendered', () => {
    const screen = render(<UserLevelFilter register={FORM_REGISTER_MOCK_IMPLEMENTATION}/>);

    expect(screen.getByTestId(FilterFieldsetTestId.Level)).toBeInTheDocument();
  });

  it.each<RenderTestEachArg>([
    { field: 'hasAmateurLevel', searchText: /любительский/gmi },
    { field: 'hasBeginnerLevel', searchText: /нулевой/gmi },
    { field: 'hasProfessionalLevel', searchText: /профессиональный/gmi }
  ])('should render checkbox by $field filter field', ({ searchText, field }) => {
    const screen = render(<UserLevelFilter register={FORM_REGISTER_MOCK_IMPLEMENTATION}/>);
    const input = Array.from(screen.container.querySelectorAll<HTMLInputElement>('input[type=checkbox]'))
      .find((current) => current.name === field);

    expect(screen.getByText(searchText)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it.each<ClickableTestEachArg>([
    { field: 'hasAmateurLevel' },
    { field: 'hasBeginnerLevel' },
    { field: 'hasProfessionalLevel' }
  ])('should clickable checkbox by $field filter field', async ({ field }) => {
    const screen = render(<UserLevelFilter register={FORM_REGISTER_MOCK_IMPLEMENTATION}/>);
    const input = Array.from(screen.container.querySelectorAll<HTMLInputElement>('input[type=checkbox]'))
      .find((current) => current.name === field);

    if (input) {
      expect(input).toBeInTheDocument();
      expect(input?.checked).toBeFalsy();

      await userEvent.click(input);

      expect(input?.checked).toBeTruthy();
      return;
    }

    throw new Error('checkbox not find');
  });
});
