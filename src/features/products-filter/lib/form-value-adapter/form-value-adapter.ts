import { FilterFormValue, FilterValue } from '@features/products-filter/model/types';

export const adaptFormValueToFilterValue = (formValue: FilterFormValue): FilterValue => {
  const priceBegin = Number.parseFloat(String(formValue.priceBegin));
  const priceEnd = Number.parseFloat(String(formValue.priceEnd));

  return {
    ...formValue,
    priceBegin: Number.isNaN(priceBegin) ? null : priceBegin,
    priceEnd: Number.isNaN(priceEnd) ? null : priceEnd,
    category: formValue.category ? formValue.category : null
  };
};
