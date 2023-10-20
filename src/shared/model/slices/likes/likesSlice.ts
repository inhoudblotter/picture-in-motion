import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface ILikesSlice {
  items: string[];
}

const initialState: ILikesSlice = {
  items: [],
};

function save(items: string[]) {
  window.localStorage.setItem('likes', JSON.stringify(items));
}

export function loadLikes() {
  try {
    const likes: string | string[] | null = window.localStorage.getItem('likes');
    if (likes) {
      return {items: JSON.parse(likes) as string[]};
    }
  } catch {
    return {items: []};
  }
  return {items: []};
}

export const likesSlice = createSlice({
  name: 'likes',
  initialState: initialState,
  reducers: {
    addLike: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
      save(state.items);
    },
    removeLike: (state, action: PayloadAction<string>) => {
      state.items.splice(
        state.items.findIndex(el => el === action.payload),
        1
      );
      save(state.items);
    },
  },
});

export const {addLike, removeLike} = likesSlice.actions;
