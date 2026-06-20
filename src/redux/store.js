import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../redux/apiSlice';
import searchSlice from './searchSlice';
import homeSlice from '../redux/homeSlice';

export const store = configureStore({
    reducer: {
        api: apiReducer,
        search: searchSlice,
        home: homeSlice,
      }
});