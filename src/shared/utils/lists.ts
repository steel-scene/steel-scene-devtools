const arraySlice = Array.prototype.slice;

export const arrayCopy = (list: { length: number; }, start?: number, end?: number) => {
    return arraySlice.call(list, start, end);
}