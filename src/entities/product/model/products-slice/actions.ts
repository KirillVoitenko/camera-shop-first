import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, PromoProduct } from '../types';
import { AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/model/enums';
import { ProductSliceState } from './types';

export enum ProductSliceActions {
  GetProducts = 'products/get'
}

type FetchProductsActionReturn = Pick<ProductSliceState, 'products' | 'promos'>

export const fetchProductsAction = createAsyncThunk<
  FetchProductsActionReturn,
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  ProductSliceActions.GetProducts,
  async (_arg, { extra: apiInstance }) => {
    const result: FetchProductsActionReturn = {
      products: [],
      promos: []
    };

    const [
      { data: productsData },
      { data: promosData }
    ] = await Promise.all([
      await apiInstance.get<Product[]>(ServerRoutesEnum.Products),
      await apiInstance.get<PromoProduct[]>(ServerRoutesEnum.Promo)
    ]);

    result.products = productsData;
    result.promos = promosData;

    return result;
  },
);
