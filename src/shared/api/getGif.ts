import {IGifObject} from '../types';
import {handleError} from './handleError';

export async function getGif(id: string) {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
    gif_id: id,
  });
  const res = await fetch(import.meta.env.VITE_GIPHY_BASE_URI + `gifs/${id}?` + params);
  if (!res.ok) handleError(res.status);
  const {data} = (await res.json()) as {data: IGifObject};
  return data;
}
