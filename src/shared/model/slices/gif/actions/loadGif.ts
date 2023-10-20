import {createAsyncThunk} from '@reduxjs/toolkit';
import {getGif} from 'src/shared/api';
import {RootState} from 'src/shared/model';
import {IError, IGifObject} from 'src/shared/types';
import {isError} from 'src/shared/types/typeGuards/isError';

export const loadGif = createAsyncThunk<
  IGifObject,
  {id: string},
  {state: RootState; rejectValue: IError}
>('gif/load', async ({id}, {rejectWithValue}) => {
  try {
    const gif = await getGif(id);
    return gif;
  } catch (error) {
    if (isError(error)) return rejectWithValue(error);
    throw error;
  }
});
