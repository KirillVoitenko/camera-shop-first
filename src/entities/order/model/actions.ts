import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Order } from './types';
import { AxiosError, AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/model/enums';

enum OrderActionsEnum {
  CreateOrder = 'order/createOrder'
}

export const createOrderFetchAction = createAsyncThunk<
  void,
  Order,
  {
    extra: AxiosInstance;
    serializedErrorType: AxiosError;
  }
>(
  OrderActionsEnum.CreateOrder,
  async (order, { extra: apiInstance }) => {
    await apiInstance.post(ServerRoutesEnum.Orders, order);
  }
);
