import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Returns an enhanced reducer
 * @param {Function} reducers
 */
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};
