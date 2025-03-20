import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import { RootState } from '@shared/model/redux';
import { Action } from '@reduxjs/toolkit';

type ThunkMiddlewareInfo = {
  middleware: ReturnType<typeof thunk.withExtraArgument<AxiosInstance, RootState, Action<string>>>;
  axiosInstance: AxiosInstance;
  axiosMockAdapter: AxiosMockAdapter;
};

export type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;

export const createAppThunkMiddlewareMock = (axiosConfig?: AxiosRequestConfig): ThunkMiddlewareInfo => {
  const axiosInstance = axios.create(axiosConfig);
  const axiosMockAdapter = new AxiosMockAdapter(axiosInstance);
  const middleware = thunk.withExtraArgument<AxiosInstance, RootState, Action<string>>(axiosInstance);

  return {
    axiosInstance,
    axiosMockAdapter,
    middleware
  };
};
