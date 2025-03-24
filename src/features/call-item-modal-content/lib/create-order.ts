import { Order } from '@entities/order';
import { CallFormValue } from '../model/types';
import { Product } from '@entities/product';
import { PHONE_MASK_CHAR } from '../config/const';

const REPLACED_CHARS = ['(', ')', PHONE_MASK_CHAR, ' ', '-'];

export const getNormalizedPhoneNumber = (phone: string): string => {
  let result = phone;

  REPLACED_CHARS.forEach((current) => {
    result = result.replaceAll(current, '');
  });

  return result;
};

export const createOrderByFormData = (product: Product, formData: CallFormValue): Order => ({
  tel: getNormalizedPhoneNumber(formData.tel),
  camerasIds: [product.id],
  coupon: null
});
