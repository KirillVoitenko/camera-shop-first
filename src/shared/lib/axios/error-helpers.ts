import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

export const isNotFoundResponseError = (error: unknown): boolean => error instanceof AxiosError && error?.response?.status === StatusCodes.NOT_FOUND;
