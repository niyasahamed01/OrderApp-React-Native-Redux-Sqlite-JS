// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchDownloadApiData } from './fetchApiData';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    skip: 0,
  },
  reducers: {
    fetchDownloadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDownloadSuccess: (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products];
      state.page += 1;
      state.skip += state.limit;
    },
    fetchDownloadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDownloadStart, fetchDownloadSuccess, fetchDownloadFailure } = searchSlice.actions;

export const fetchNextPage = () => async (dispatch, getState) => {
  const { page, limit, skip } = getState().search;
  dispatch(fetchDownloadApiData({ page, limit, skip }));
};

export default searchSlice.reducer;