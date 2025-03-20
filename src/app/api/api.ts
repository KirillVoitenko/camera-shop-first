import axios, { type AxiosRequestConfig } from 'axios';

export const createApiInstance = (config: AxiosRequestConfig) => axios.create(config);
