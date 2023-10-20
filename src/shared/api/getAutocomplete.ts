export async function getAutocomplete(query: string) {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
    q: query,
  });
  const res = await fetch(import.meta.env.VITE_GIPHY_BASE_URI + 'gifs/search/tags?' + params);
  const data = await res.json();
  const result = data.data.map((row: {name: string}) => row.name);
  return result;
}
