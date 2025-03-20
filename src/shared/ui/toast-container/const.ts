import { Bounce, ToastOptions } from 'react-toastify';

export const TOAST_CONTAINER_ID = 'MAIN_TOAST_CONTAINER';

export const TOAST_PUSHES_LIMIT = 1;
export const AUTO_CLOSE_TIME = 3000;
export const TOAST_THEME = 'colored';
export const TOAST_POSITION = 'bottom-center';

export const TOAST_OPTIONS: ToastOptions<string> = {
  position: TOAST_POSITION,
  autoClose: AUTO_CLOSE_TIME,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: TOAST_THEME,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  transition: Bounce,
  containerId: TOAST_CONTAINER_ID
};
