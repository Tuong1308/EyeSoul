/** localStorage, or nothing when the browser blocks it (e.g. some private modes). */
export function browserStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
