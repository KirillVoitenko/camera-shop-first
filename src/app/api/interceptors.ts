import { TOAST_CONTAINER_ID, TOAST_OPTIONS } from '@shared/ui/toast-container';
import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

type ResponseInterceptor = Parameters<AxiosInstance['interceptors']['response']['use']>

const handleErrorProcess = (errorMessage: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  toast.dismiss({containerId: TOAST_CONTAINER_ID});
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  toast.error(errorMessage, TOAST_OPTIONS);
};

const handleResponseError = (error: AxiosError<{message: string}>) => {
  if (error?.response && !!StatusCodeMapping[error.response.status]) {
    handleErrorProcess(error.response.data.message ?? error.message);
  }

  throw error;
};

export const responseErrorInterceptor: ResponseInterceptor = [
  (response) => response,
  handleResponseError
];
