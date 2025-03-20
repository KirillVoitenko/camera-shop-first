import { ToastContainer as ReactToastifyContainer } from 'react-toastify';
import { JSX } from 'react';
import { AUTO_CLOSE_TIME, TOAST_CONTAINER_ID, TOAST_POSITION, TOAST_PUSHES_LIMIT, TOAST_THEME } from './const';

export function ToastContainer(): JSX.Element {
  return (
    <ReactToastifyContainer
      limit={TOAST_PUSHES_LIMIT}
      autoClose={AUTO_CLOSE_TIME}
      theme={TOAST_THEME}
      position={TOAST_POSITION}
      containerId={TOAST_CONTAINER_ID}
    />
  );
}
