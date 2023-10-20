import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IError, IGifObject, IPaginationObject} from 'src/shared/types';
import {nextPage} from './actions';

interface ITape {
  type: 'search' | 'trending' | 'likes' | null;
  items: IGifObject[];
  pagination: IPaginationObject;
  isEnd: boolean;
  loading: boolean;
  query: string;
  error?: IError;
}

const initialState: ITape = {
  type: 'trending',
  items: [],
  isEnd: false,
  query: '',
  pagination: {
    count: 0,
    total_count: 1,
    offset: 0,
  },
  loading: false,
};

export const tapeSlice = createSlice({
  name: 'tape',
  initialState: initialState,
  reducers: {
    changeType: (
      state,
      action: PayloadAction<{type: 'search'; query: string} | 'trending' | 'likes'>
    ) => {
      console.log(action.payload);
      state.items = [];
      state.loading = false;
      state.isEnd = false;
      delete state.error;
      state.pagination = {count: 0, total_count: 1, offset: 0};
      if (typeof action.payload === 'string') {
        state.type = action.payload;
      } else {
        state.type = action.payload.type;
        state.query = action.payload.query;
      }
    },
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setEnd: (state, action: PayloadAction<boolean>) => {
      state.isEnd = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(nextPage.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.items = [...state.items, ...action.payload.data];
      state.pagination = action.payload.pagination;
      state.loading = false;
    });
    builder.addCase(nextPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {setEnd, setLoading, changeType, changeQuery} = tapeSlice.actions;
