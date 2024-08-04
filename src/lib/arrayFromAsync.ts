export default async function arrayFromAsync<T, TReturn = void, TNext = unknown>(x: AsyncIterator<T, TReturn, TNext>) {
  const result: T[] = [];
  for (let itResult = await x.next(); !itResult.done; itResult = await x.next()) {
    result.push(itResult.value);
  }
  return result;
}