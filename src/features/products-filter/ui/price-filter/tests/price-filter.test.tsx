import { PriceFilter } from '../price-filter';
import { render } from '@testing-library/react';
import { PriceLimit } from '@entities/product';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { UseFormRegister } from 'react-hook-form';
import { FilterFormValue } from '@features/products-filter/model/types';

const REGISTER_MOCK: UseFormRegister<FilterFormValue> = (name) => ({
  name,
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn()
});

const USE_FORM_RETURN_MOCK = {
  register: REGISTER_MOCK
};

describe('component \'PriceFilter\'', () => {
  it('should rendered', () => {
    const priceLimits: PriceLimit = {
      max: null,
      min: null,
    };
    const screen = render(
      <PriceFilter
        getFieldError={vi.fn()}
        maxPrice={priceLimits.max}
        minPrice={priceLimits.min}
        register={USE_FORM_RETURN_MOCK.register}
        setField={vi.fn()}
      />);

    expect(screen.getByTestId(FilterFieldsetTestId.Price)).toBeInTheDocument();
  });

  it('should render price range inputs', () => {
    const priceBeginInputPlaceholder = /от/gmi;
    const priceEndInputPlaceholder = /до/gmi;

    const priceLimits: PriceLimit = {
      max: null,
      min: null,
    };

    const screen = render(
      <PriceFilter
        getFieldError={vi.fn()}
        maxPrice={priceLimits.max}
        minPrice={priceLimits.min}
        register={USE_FORM_RETURN_MOCK.register}
        setField={vi.fn()}
      />);

    expect(screen.getByPlaceholderText(priceBeginInputPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(priceEndInputPlaceholder)).toBeInTheDocument();
  });

  it('should render correct placeholders with price limits defined', () => {
    const priceLimits: PriceLimit = {
      max: faker.datatype.number(),
      min: faker.datatype.number(),
    };

    const screen = render(
      <PriceFilter
        getFieldError={vi.fn()}
        maxPrice={priceLimits.max}
        minPrice={priceLimits.min}
        register={USE_FORM_RETURN_MOCK.register}
        setField={vi.fn()}
      />);

    expect(screen.getByPlaceholderText(String(priceLimits.max))).toBeInTheDocument();
    expect(screen.getByPlaceholderText(String(priceLimits.min))).toBeInTheDocument();
  });

  it('should render not blocked price range inputs', async () => {
    const priceBeginInputPlaceholder = /от/gmi;
    const priceEndInputPlaceholder = /до/gmi;

    const priceBeginInputText = faker.datatype.number().toString();
    const priceEndInputText = faker.datatype.number().toString();

    const priceLimits: PriceLimit = {
      max: null,
      min: null,
    };

    const screen = render(
      <PriceFilter
        getFieldError={vi.fn()}
        maxPrice={priceLimits.max}
        minPrice={priceLimits.min}
        register={USE_FORM_RETURN_MOCK.register}
        setField={vi.fn()}
      />);

    await userEvent.type(
      screen.getByPlaceholderText(priceBeginInputPlaceholder),
      priceBeginInputText
    );
    await userEvent.type(
      screen.getByPlaceholderText(priceEndInputPlaceholder),
      priceEndInputText
    );

    expect(screen.getByDisplayValue(priceBeginInputText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(priceEndInputText)).toBeInTheDocument();
  });

  it('should call register callback', () => {
    const registerSpy = vi.spyOn(USE_FORM_RETURN_MOCK, 'register');
    const priceBeginInputName: keyof FilterFormValue = 'priceBegin';
    const priceEndInputName: keyof FilterFormValue = 'priceEnd';
    const priceLimits: PriceLimit = {
      max: null,
      min: null,
    };

    render(
      <PriceFilter
        getFieldError={vi.fn()}
        maxPrice={priceLimits.max}
        minPrice={priceLimits.min}
        register={USE_FORM_RETURN_MOCK.register}
        setField={vi.fn()}
      />
    );

    expect(registerSpy).toHaveBeenCalledWith(priceBeginInputName, undefined);
    expect(registerSpy).toHaveBeenCalledWith(priceEndInputName, undefined);
  });
});
