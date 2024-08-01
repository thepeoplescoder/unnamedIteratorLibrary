export function callIteratorMethod<T, TReturn, TNext>(
  it: Iterator<T, TReturn, TNext>,
  key: keyof (typeof it),
  ...x: [] | [any]
): IteratorResult<T, TReturn>
{
  return getMethod<T, TReturn, TNext>(it, key)(...x);
}

export async function callAsyncIteratorMethod<T, TReturn, TNext>(
  it: AsyncIterator<Awaited<T>, TReturn, TNext>,
  key: keyof (typeof it),
  ...x: [] | [any]
): Promise<IteratorResult<Awaited<T>, TReturn>>
{
  return await getMethod<T, TReturn, TNext>(it, key)(...x);
}

function getMethod<T, TReturn, TNext>(it: Iterator<T, TReturn, TNext>, key: keyof (typeof it)):
  (...x: any[]) => IteratorResult<T, TReturn>;
function getMethod<T, TReturn, TNext>(it: AsyncIterator<Awaited<T>, TReturn, TNext>, key: keyof (typeof it)):
  (...x: any[]) => Promise<IteratorResult<Awaited<T>, TReturn>>;
function getMethod<T, TReturn, TNext>(
  it:  Iterator<T, TReturn, TNext> | AsyncIterator<Awaited<T>, TReturn, TNext>,
  key: keyof (typeof it)
) {
  return (  method => typeof method === "function" ? method.bind(it) : noSuchMethod(key)  )(it[key]);
}

function noSuchMethod(key: string): never {
  throw new TypeError(`The "${key}" method does not exist on this iterator.`);
}