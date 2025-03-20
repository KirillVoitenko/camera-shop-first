import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types';
import { AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/model/enums';

export enum ProductSliceActions {
  GetProducts = 'products/get'
}

export const fetchProductsAction = createAsyncThunk<
  Product[],
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  ProductSliceActions.GetProducts,
  async (_arg, { extra: apiInstance }) => {
    const { data } = await apiInstance.get<Product[]>(ServerRoutesEnum.Products);
    return data;
  },
);
