import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from 'src/shared/model';
import {IContent} from 'src/shared/types/IContent';
import {setEnd, setLoading} from '../tapeSlice';
import {getLikes, getTrending, searchGifs} from 'src/shared/api';
import {IError} from 'src/shared/types';
import {isError} from 'src/shared/types/typeGuards/isError';

export const nextPage = createAsyncThunk<
  IContent | undefined,
  {limit: number},
  {state: RootState; rejectValue: IError}
>('tape/nextPage', async ({limit = 25}, {dispatch, getState, rejectWithValue}) => {
  const {tape, likes} = getState();
  if (tape.loading || tape.isEnd) return;
  dispatch(setLoading(true));
  const offset = tape.pagination.count + tape.pagination.offset;
  let r;
  try {
    if (tape.type === 'trending') {
      r = await getTrending(offset, limit);
      return r;
    } else if (tape.type === 'search') {
      r = await searchGifs(tape.query, offset, limit);
    } else if (tape.type === 'likes') {
      r = await getLikes(likes.items, offset, limit);
    }
  } catch (error) {
    if (isError(error)) return rejectWithValue(error);
    throw error;
  }
  setLoading(false);
  if (!r) return;

  if (r.pagination.count + r.pagination.offset >= r.pagination.total_count) dispatch(setEnd(true));
  return r;
});
