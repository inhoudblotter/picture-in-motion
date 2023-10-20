import {IContent} from '../types/IContent';
import {handleError} from './handleError';

export async function getTrending(offset: number = 0, limit: number = 25) {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
    offset: offset.toString(),
    limit: limit.toString(),
  });
  const res = await fetch(import.meta.env.VITE_GIPHY_BASE_URI + 'gifs/trending?' + params);
  if (!res.ok) handleError(res.status);
  const data = (await res.json()) as IContent;
  return data;
}
