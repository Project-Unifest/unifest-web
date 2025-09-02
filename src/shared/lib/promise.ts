export function sequence<T, R>(items: readonly T[], task: (item: T, index: number, array: readonly T[]) => Promise<R>): Promise<R[]> {
    return items.reduce<Promise<R[]>>(async (promise, item, index, array) =>{
        const prev = await promise;
        const result = await task(item, index, array);
        return [ ...prev, result ];
    }, Promise.resolve([]));
}