import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import {likesSlice, loadLikes} from './slices/likes';
import {tapeSlice} from './slices/tape/tapeSlice';
import {gifSlice} from './slices/gif';

export const store = configureStore({
  reducer: {
    likes: likesSlice.reducer,
    tape: tapeSlice.reducer,
    gif: gifSlice.reducer,
  },
  preloadedState: {
    likes: loadLikes(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
