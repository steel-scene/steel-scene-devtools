export function merge<T>(source1: T, source2: T): T {
  return Object.assign({}, source1, source2)
}
