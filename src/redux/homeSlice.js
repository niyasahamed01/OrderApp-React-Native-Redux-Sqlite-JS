// homeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchHomeApiData } from '../redux/fetchApiData';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    skip: 0,
  },
  reducers: {
    fetchHomeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHomeSuccess: (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products];
      state.page += 1;
      state.skip += state.limit;
    },
    fetchHomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchHomeStart, fetchHomeSuccess, fetchHomeFailure } = homeSlice.actions;

export const fetchNextPage = () => async (dispatch, getState) => {
  const { page, limit, skip } = getState().home;
  dispatch(fetchHomeApiData({ page, limit, skip }));
};

export default homeSlice.reducer;