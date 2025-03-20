import store from '../store';

declare namespace ReduxStore {
  type RootState = ReturnType<typeof store.getState>
  type AppDispatch = typeof store.dispatch
}

