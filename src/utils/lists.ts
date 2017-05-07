export function tail<T>(indexed: T[], predicate?: { (t: T): boolean; }): T | undefined {
  if (!indexed) {
    return undefined;
  }
  const len = indexed.length;
  if (len < 1) {
    return undefined;
  }
  if (predicate === undefined) {
    return indexed[len - 1];
  }
  for (let i = len - 1; i > -1; i--) {
    if (predicate(indexed[i])) {
      return indexed[i];
    }
  }
  return undefined;
}