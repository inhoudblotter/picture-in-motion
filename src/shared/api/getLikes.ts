import {IContent} from '../types/IContent';
import {handleError} from './handleError';

export async function getLikes(ids: string[], offset: number = 0, limit: number = 25) {
  if (ids.length === 0) return {data: [], pagination: {total_count: 0, offset: 0, count: 0}};
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
    ids: ids.slice(offset, offset + limit).join(','),
  });
  const res = await fetch(import.meta.env.VITE_GIPHY_BASE_URI + 'gifs?' + params);
  if (!res.ok) handleError(res.status);
  const data = (await res.json()) as IContent;
  data.pagination.total_count = ids.length;
  data.pagination.offset = offset;
  data.pagination.count = limit;
  return data;
}
