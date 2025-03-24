import { generateProductMock } from '@test-utills/mocks/product';
import { createOrderByFormData, getNormalizedPhoneNumber } from '../create-order';
import { Order } from '@entities/order';

const FAKE_PHONE = '+7 (000) 000-00-00';
const NORMALIZED_FAKE_PHONE = '+70000000000';

describe('Create order functions', () => {
  it('function \'getNormalizedPhoneNumber\' should correct works', () => {
    const result = getNormalizedPhoneNumber(FAKE_PHONE);

    expect(result).toBe(NORMALIZED_FAKE_PHONE);
  });

  it('function \'createOrderByFormData\' should correct works', () => {
    const productMock = generateProductMock();
    const expected: Order = {
      camerasIds: [productMock.id],
      coupon: null,
      tel: NORMALIZED_FAKE_PHONE
    };

    const result = createOrderByFormData(productMock, {tel: FAKE_PHONE});

    expect(result).toEqual(expected);
  });
});
