import {createSlice} from '@reduxjs/toolkit';
import {IError, IGifObject} from 'src/shared/types';
import {loadGif} from './actions';

interface IGif {
  item: IGifObject | null;
  loading: boolean;
  error?: IError;
}

const initialState: IGif = {
  item: null,
  loading: false,
};

export const gifSlice = createSlice({
  name: 'gif',
  initialState: initialState,
  reducers: {
    cleanGif: state => {
      state.item = null;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadGif.pending, state => {
      state.loading = true;
      delete state.error;
    });
    builder.addCase(loadGif.fulfilled, (state, action) => {
      state.item = action.payload;
      state.loading = false;
    });
    builder.addCase(loadGif.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const {cleanGif} = gifSlice.actions;
