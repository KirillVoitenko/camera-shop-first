import { Product } from '@entities/product';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoutesEnum, ServerRoutesEnum } from '@shared/model/enums';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { ProductSliceState } from './types';
import { Comment } from '@entities/comment';
import { isNotFoundResponseError } from '@shared/lib/axios';
import { AppDispatch } from '@shared/model/redux';
import { redirectToRouteAction } from '@shared/lib/store';

export enum ProductSliceActionsName {
  FetchProduct = 'product/fetch'
}

type FetchProductActionArguments = {
  cameraId: number;
}

export type FetchProductActionReturn = Pick<ProductSliceState, 'comments' | 'product' | 'similarProducts'>;

export const fetchProductAction = createAsyncThunk<
  FetchProductActionReturn,
  FetchProductActionArguments,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>(
  ProductSliceActionsName.FetchProduct,
  async (arg, { extra: apiInstance, dispatch }) => {
    const cameraId = String(arg.cameraId);
    const productUrl = generatePath(ServerRoutesEnum.Product, { cameraId });
    const commentsUrl = generatePath(ServerRoutesEnum.Comments, { cameraId });
    const similarProductsUrl = generatePath(ServerRoutesEnum.SimilarProducts, { cameraId });
    const result: FetchProductActionReturn = {
      comments: [],
      product: null,
      similarProducts: []
    };

    try {
      const { data: product } = await apiInstance.get<Product>(productUrl);
      result.product = product;
    } catch (err) {
      if (isNotFoundResponseError(err)) {
        dispatch(redirectToRouteAction({ route: AppRoutesEnum.NotFound, replace: true }));
      }
      throw err;
    }

    const [
      { data: comments },
      { data: similars },
    ] = await Promise.all([
      apiInstance.get<Comment[]>(commentsUrl),
      apiInstance.get<Product[]>(similarProductsUrl)
    ]);

    result.comments = comments.sort((firstComment, secondComment) => {
      const firstCommentDate = Date.parse(firstComment.createAt);
      const secondCommentDate = Date.parse(secondComment.createAt);
      return secondCommentDate - firstCommentDate;
    });
    result.similarProducts = similars;

    return result;
  }
);
