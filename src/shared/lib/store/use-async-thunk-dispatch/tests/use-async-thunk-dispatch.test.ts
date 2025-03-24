import { useAsyncThunkDispatch } from '../use-async-thunk-dispatch';
import { renderHook } from '@testing-library/react';
import { getStoreWrapper } from '@test-utills/wrappers';
import { Action, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/model/redux';
import { AppThunkDispatch, createAppThunkMiddlewareMock, isActionsEquals } from '@test-utills/mocks/redux';
import { FC } from 'react';

enum FakeActionsNames {
  Resolved = 'fake/resolved',
  Rejected = 'fake/rejected',
}

const ON_FULLFILLED_CALLBACK = vi.fn();
const ON_REJECTED_CALLBACK = vi.fn();

const FAKE_RESOLVED_ACTION = createAsyncThunk<void, undefined, {extra: AxiosInstance}>(
  FakeActionsNames.Resolved,
  async () => {
    await Promise.resolve();
  }
);

const FAKE_REJECTED_ACTION = createAsyncThunk<void, undefined, {extra: AxiosInstance}>(
  FakeActionsNames.Resolved,
  async () => {
    await Promise.reject();
  }
);

describe('Hook \'useAsyncThunkDispatch\'', () => {
  const { middleware } = createAppThunkMiddlewareMock();
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    ON_FULLFILLED_CALLBACK.mockReset();
    ON_REJECTED_CALLBACK.mockReset();
    store = storeCreator({});

    storeWrapper = getStoreWrapper(store);
  });

  it('should return correct signature', () => {
    const { result } = renderHook(() => useAsyncThunkDispatch(FAKE_RESOLVED_ACTION), {wrapper: storeWrapper});

    expect(typeof result.current).toBe('function');
  });

  it('should dispatch async thunk with call returned function if thunk resolved', async () => {
    const { result } = renderHook(() => useAsyncThunkDispatch(FAKE_RESOLVED_ACTION), {wrapper: storeWrapper});
    const actionDispatch = result.current;

    await actionDispatch(undefined);

    expect(isActionsEquals(
      store.getActions(),
      [FAKE_RESOLVED_ACTION.pending, FAKE_RESOLVED_ACTION.fulfilled]
    )).toBeTruthy();
  });

  it('should dispatch async thunk with call returned function if thunk rejected', async () => {
    const { result } = renderHook(() => useAsyncThunkDispatch(FAKE_REJECTED_ACTION), {wrapper: storeWrapper});
    const actionDispatch = result.current;

    await actionDispatch(undefined);

    expect(isActionsEquals(
      store.getActions(),
      [FAKE_REJECTED_ACTION.pending, FAKE_REJECTED_ACTION.rejected]
    )).toBeTruthy();
  });

  it('should call \'onFullfilled\' callback if thunk resolved', async () => {
    const { result } = renderHook(() => useAsyncThunkDispatch(FAKE_RESOLVED_ACTION, ON_FULLFILLED_CALLBACK, ON_REJECTED_CALLBACK), {wrapper: storeWrapper});
    const actionDispatch = result.current;

    await actionDispatch(undefined);

    expect(ON_FULLFILLED_CALLBACK).toBeCalledTimes(1);
    expect(ON_REJECTED_CALLBACK).not.toBeCalled();
  });

  it('should call \'onRejected\' callback if thunk rejected', async () => {
    const { result } = renderHook(() => useAsyncThunkDispatch(FAKE_REJECTED_ACTION, ON_FULLFILLED_CALLBACK, ON_REJECTED_CALLBACK), {wrapper: storeWrapper});
    const actionDispatch = result.current;

    await actionDispatch(undefined);

    expect(ON_REJECTED_CALLBACK).toBeCalledTimes(1);
    expect(ON_FULLFILLED_CALLBACK).not.toBeCalled();
  });
});
