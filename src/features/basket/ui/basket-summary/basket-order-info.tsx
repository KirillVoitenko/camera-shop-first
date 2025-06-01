import {
  OrderStatus,
  OrderStatusError,
  OrderStatusSuccess,
} from '@entities/order';
import { useBasket } from '@features/basket/lib/use-basket';
import { useOrderInfo } from '@features/basket/lib/use-order-info';
import { ProductInBasket } from '@features/basket/model/types';
import { moneyFormat } from '@shared/lib/format';
import { Nullable } from '@shared/model/utill-types';
import { JSX, useState } from 'react';
import { Modal } from '@shared/ui/modal';
import { CreateOrderResultModalContent } from '@entities/order';
import { useNavigate } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';

type BasketOrderInfoProps = {
  basket: ProductInBasket[];
}

const ORDER_CREATE_SUCCESS_STATUS: OrderStatusSuccess = {
  status: 'success'
};

const createOrderErrorStatus = (resolution: string): OrderStatusError => ({
  resolution,
  status: 'error'
});

type RedirectTarget = 'basket' | 'productList';

export function BasketOrderInfo({ basket }: BasketOrderInfoProps): JSX.Element {
  const [orderStatus, setOrderStatus] = useState<Nullable<OrderStatus>>(null);
  const navigate = useNavigate();

  const { clearBasket, coupon } = useBasket();

  const {
    getOrderPriceInfo,
    createOrder
  } = useOrderInfo();

  const priceInfo = getOrderPriceInfo(basket, coupon?.data?.discountPercent);

  const clearOrderStatus = () => setOrderStatus(null);

  const orderResultModalCloseHandler = () => {
    if (orderStatus?.status === 'success') {
      clearBasket();
    }
    clearOrderStatus();
  };

  const modalLinkClickHandler = (target: RedirectTarget) => {
    orderResultModalCloseHandler();

    const redirectUrl = target === 'basket' ? AppRoutesEnum.Basket : AppRoutesEnum.Main;

    navigate(redirectUrl);
  };

  const orderSubmitHandler = () => {
    const couponString = coupon.data?.coupon ? coupon.data.coupon : null;
    createOrder(basket, couponString)
      .then(() => {
        setOrderStatus(ORDER_CREATE_SUCCESS_STATUS);
      })
      .catch(() => {
        setOrderStatus(createOrderErrorStatus('Не удалось сформировать заказ! Повторите попытку позднее'));
      });
  };

  return (
    <div className='basket__summary-order' data-testid='basket-summary-order'>
      <p className='basket__summary-item'>
        <span className='basket__summary-text'>
          Всего:
        </span>
        <span className='basket__summary-value'>
          {moneyFormat(priceInfo.allPrice)}
        </span>
      </p>
      <p className='basket__summary-item'>
        <span className='basket__summary-text'>
          Скидка:
        </span>
        <span className='basket__summary-value basket__summary-value--bonus'>
          {moneyFormat(priceInfo.discountPrice)}
        </span>
      </p>
      <p className='basket__summary-item'>
        <span className='basket__summary-text'>
          К оплате:
        </span>
        <span className='basket__summary-value basket__summary-value--total'>
          {moneyFormat(priceInfo.toPaymentPrice)}
        </span>
      </p>
      <button
        className='btn btn--purple'
        type='submit'
        onClick={orderSubmitHandler}
      >
        Оформить заказ
      </button>
      <Modal
        isOpened={!!orderStatus}
        onClose={orderResultModalCloseHandler}
        className='modal--narrow'
      >
        {orderStatus && (
          <CreateOrderResultModalContent
            status={orderStatus}
            onToBasketClick={() => modalLinkClickHandler('basket')}
            onToProductListClick={() => modalLinkClickHandler('productList')}
          />
        )}
      </Modal>
    </div>
  );
}
