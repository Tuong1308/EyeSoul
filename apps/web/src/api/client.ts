import type { HomepageResponse } from '@eyesoul/shared';

const baseUrl = import.meta.env.VITE_API_URL;

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json() as Promise<T>;
}

/** The single typed client for the Eye Soul API. */
export const api = {
  homepage: () => get<HomepageResponse>('/homepage'),
};
