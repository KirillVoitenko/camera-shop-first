import { configureStore } from '@reduxjs/toolkit';
import { createApiInstance, responseErrorInterceptor } from '@app/api';
import { rootReducer } from './reducer';
import { DEFAULT_API_SETTINGS } from '@app/config/api';
import { APP_HISTORY } from '@app/config/routing';
import { createRedirectMiddleware } from '@shared/lib/store';

const apiInstance = createApiInstance(DEFAULT_API_SETTINGS);
apiInstance.interceptors.response.use(...responseErrorInterceptor);
const redirectMiddleware = createRedirectMiddleware(APP_HISTORY);

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance
      }
    }).concat(redirectMiddleware);
  },
});

export default store;
