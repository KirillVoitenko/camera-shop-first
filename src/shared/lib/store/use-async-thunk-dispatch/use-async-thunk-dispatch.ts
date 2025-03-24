import { AsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { useAppDispatch } from '../redux';

type UseAsyncThunkDispatchReturn<ThunkArg> = (thunkArg: ThunkArg) => Promise<void>;

export const useAsyncThunkDispatch = <Returned, ThunkArg>(
  thunk: AsyncThunk<Returned, ThunkArg, { extra: AxiosInstance }>,
  onFullfilled?: (data?: Returned) => void | Promise<void>,
  onRejected?: (error?: SerializedError) => void | Promise<void>,
): UseAsyncThunkDispatchReturn<ThunkArg> => {
  const dispatch = useAppDispatch();

  const returnedDispatch = async (thunkArg: ThunkArg) => {
    const dispatchResult = await dispatch(thunk(thunkArg));

    if (dispatchResult.meta.requestStatus === 'fulfilled' && onFullfilled) {
      await onFullfilled(dispatchResult.payload as Returned);
    }

    if (dispatchResult.meta.requestStatus === 'rejected' && onRejected) {
      await onRejected('error' in dispatchResult ? dispatchResult.error : undefined);
    }
  };

  return returnedDispatch;
};
