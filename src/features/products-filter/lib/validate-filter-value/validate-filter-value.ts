import { PriceLimit } from '@entities/product';
import {
  FilterValue,
  NonNullablePriceLimits,
  PriceFilterFormFields
} from '@features/products-filter/model/types';
import { ErrorOption } from 'react-hook-form';
import { DefaultPriceValues } from '@features/products-filter/config/const';

type ValidationFields = keyof PriceFilterFormFields;

type FilterValueValidationResult = {
  isValid: boolean;
  errors?: Partial<Record<ValidationFields, ErrorOption>>;
};

export const validateFilterValue = (value: FilterValue, limits: PriceLimit): FilterValueValidationResult => {
  const result: FilterValueValidationResult = {
    isValid: true,
  };

  const priceLimits: NonNullablePriceLimits = {
    max: limits.max ?? DefaultPriceValues.priceEnd,
    min: limits.min ?? DefaultPriceValues.priceBegin
  };

  const priceBegin = value.priceBegin ?? DefaultPriceValues.priceBegin;
  const priceEnd = value.priceEnd ?? DefaultPriceValues.priceEnd;

  if (priceBegin !== DefaultPriceValues.priceBegin) {
    if (priceBegin < priceLimits.min) {
      result.isValid = false;
      result.errors = {
        ...result.errors,
        priceBegin: {
          message: `Минимальное значение ${priceLimits.min}`
        }
      };
    }

    if (priceBegin > priceLimits.max) {
      result.isValid = false;
      result.errors = {
        ...result.errors,
        priceBegin: {
          message: `Максимальное значение ${priceLimits.max}`
        }
      };
    }
  }

  if (priceEnd !== DefaultPriceValues.priceEnd) {
    if (priceEnd > priceLimits.max) {
      result.isValid = false;
      result.errors = {
        ...result.errors,
        priceEnd: {
          message: `Максимальное значение ${priceLimits.max}`
        }
      };
    }
    if (priceEnd < priceLimits.min) {
      result.isValid = false;
      result.errors = {
        ...result.errors,
        priceEnd: {
          message: `Минимальное значение ${priceLimits.min}`
        }
      };
    }
  }

  if (priceBegin !== DefaultPriceValues.priceBegin && priceEnd !== DefaultPriceValues.priceEnd) {
    if (priceBegin > priceEnd) {
      result.isValid = false;
      result.errors = {
        ...result.errors,
        priceBegin: {
          message: `Максимальное значение ${priceEnd}`
        }
      };
    }

    if (priceEnd < priceBegin) {
      result.isValid = false;
      result.errors = {
        ...result.errors,
        priceEnd: {
          message: `Минимальное значение ${priceBegin}`
        }
      };
    }
  }

  return result;
};
