import { UseFormRegister } from 'react-hook-form';
import { CategoryFilter } from '../category-filter';
import { render } from '@testing-library/react';
import { FilterFormValue } from '@features/products-filter/model/types';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';
import { ProductCategory } from '@entities/product';
import userEvent from '@testing-library/user-event';

const REGISTER_MOCK: UseFormRegister<FilterFormValue> = (name) => ({
  name,
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn()
});

describe('component \'CategoryFilter\'', () => {
  it('should rendered', () => {
    const screen = render(<CategoryFilter register={REGISTER_MOCK} />);

    expect(screen.getByTestId(FilterFieldsetTestId.Category)).toBeInTheDocument();
  });

  it('sould render radio inputs by product categories', () => {
    const screen = render(<CategoryFilter register={REGISTER_MOCK} />);
    const radioInputs = Array.from(screen.container.querySelectorAll<HTMLInputElement>('input[type=radio]'));

    const photoRadioElement = radioInputs.find((current) => current.value === ProductCategory.PhotoCamera);
    const videoRadioElement = radioInputs.find((current) => current.value === ProductCategory.VideoCamera);

    expect(photoRadioElement).toBeTruthy();
    expect(videoRadioElement).toBeTruthy();
  });

  it('sould render clickable radio inputs by product categories', async () => {
    const screen = render(<CategoryFilter register={REGISTER_MOCK} />);
    const radioInputs = Array.from(screen.container.querySelectorAll<HTMLInputElement>('input[type=radio]'));

    const photoRadioElement = radioInputs.find((current) => current.value === ProductCategory.PhotoCamera);
    const videoRadioElement = radioInputs.find((current) => current.value === ProductCategory.VideoCamera);

    if (photoRadioElement && videoRadioElement) {
      await userEvent.click(photoRadioElement);
      expect(photoRadioElement.checked).toBeTruthy();
      expect(videoRadioElement.checked).toBeFalsy();

      await userEvent.click(videoRadioElement);
      expect(photoRadioElement.checked).toBeFalsy();
      expect(videoRadioElement.checked).toBeTruthy();
      return;
    }

    throw new Error('inputs not finded');
  });
});
