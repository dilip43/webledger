import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducer/user.js';

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
