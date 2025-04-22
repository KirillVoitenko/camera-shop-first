import { FilterFormValue } from '@features/products-filter/model/types';
import { CameraTypeFilter } from '../camera-type-filter';
import { render } from '@testing-library/react';
import { UseFormRegister } from 'react-hook-form';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';
import userEvent from '@testing-library/user-event';
import { ProductCategory } from '@entities/product';
import { Nullable } from '@shared/model/utill-types';

interface BaseEachArg {
  field: keyof FilterFormValue;
}

interface RenderTestEachArg extends BaseEachArg {
  field: keyof FilterFormValue;
  searchText: RegExp;
}

type ClickableTestEachArg = BaseEachArg;

interface EnabledByCategoryTestEachArg extends BaseEachArg {
  enabled: boolean;
  category?: Nullable<ProductCategory>;
}

const getInputByName = (searchContainer: HTMLElement, name: string): HTMLInputElement | undefined => Array.from(
  searchContainer.querySelectorAll<HTMLInputElement>('input[type=checkbox]')
).find((current) => current.name === name);

const FORM_REGISTER_MOCK_IMPLEMENTATION: UseFormRegister<FilterFormValue> = (name, options) => ({
  name,
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn(),
  disabled: options?.disabled
});

describe('component \'UserLevelFilter\'', () => {
  it('should rendered', () => {
    const screen = render(<CameraTypeFilter register={FORM_REGISTER_MOCK_IMPLEMENTATION} resetField={vi.fn()}/>);

    expect(screen.getByTestId(FilterFieldsetTestId.Type)).toBeInTheDocument();
  });

  it.each<RenderTestEachArg>([
    { field: 'hasDigitalType', searchText: /цифровая/gmi },
    { field: 'hasFilmType', searchText: /плёночная/gmi },
    { field: 'hasMomentalType', searchText: /моментальная/gmi },
    { field: 'hasCollectionType', searchText: /коллекционная/gmi }
  ])('should render checkbox by $field filter field', ({ searchText, field }) => {
    const screen = render(
      <CameraTypeFilter
        register={FORM_REGISTER_MOCK_IMPLEMENTATION}
        resetField={vi.fn()}
      />
    );
    const input = getInputByName(screen.container, field);

    expect(screen.getByText(searchText)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it.each<ClickableTestEachArg>([
    { field: 'hasDigitalType' },
    { field: 'hasFilmType' },
    { field: 'hasMomentalType' },
    { field: 'hasCollectionType' }
  ])('should clickable checkbox by $field filter field', async ({ field }) => {
    const screen = render(
      <CameraTypeFilter
        register={FORM_REGISTER_MOCK_IMPLEMENTATION}
        resetField={vi.fn()}
      />);
    const input = getInputByName(screen.container, field);

    if (input) {
      expect(input).toBeInTheDocument();
      expect(input?.checked).toBeFalsy();

      await userEvent.click(input);

      expect(input?.checked).toBeTruthy();
      return;
    }

    throw new Error('checkbox not find');
  });

  it.each<EnabledByCategoryTestEachArg>([
    { field: 'hasDigitalType', enabled: true },
    { field: 'hasFilmType', enabled: true },
    { field: 'hasMomentalType', enabled: true },
    { field: 'hasCollectionType', enabled: true },
    { field: 'hasDigitalType', enabled: true, category: null },
    { field: 'hasFilmType', enabled: true, category: null },
    { field: 'hasMomentalType', enabled: true, category: null },
    { field: 'hasCollectionType', enabled: true, category: null },
    { field: 'hasDigitalType', enabled: true, category: ProductCategory.PhotoCamera },
    { field: 'hasFilmType', enabled: true, category: ProductCategory.PhotoCamera },
    { field: 'hasMomentalType', enabled: true, category: ProductCategory.PhotoCamera },
    { field: 'hasCollectionType', enabled: true, category: ProductCategory.PhotoCamera },
    { field: 'hasDigitalType', enabled: true, category: ProductCategory.VideoCamera },
    { field: 'hasFilmType', enabled: false, category: ProductCategory.VideoCamera },
    { field: 'hasMomentalType', enabled: false, category: ProductCategory.VideoCamera },
    { field: 'hasCollectionType', enabled: true, category: ProductCategory.VideoCamera }
  ])('should correct disabling $field checkbox by product categories', ({enabled, field, category}) => {
    const screen = render(
      <CameraTypeFilter
        register={FORM_REGISTER_MOCK_IMPLEMENTATION}
        resetField={vi.fn()}
        selectedProductCategory={category}
      />);

    const input = getInputByName(screen.container, field);

    expect(input?.disabled).not.toBe(enabled);
  });
});
