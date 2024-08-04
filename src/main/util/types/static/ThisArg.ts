export type ThisArg = [] | [any];

export function bindThisArg<T extends Function>(f: T, ...thisArg: ThisArg): T {
  return thisArg.length === 0 ? f : f.bind(thisArg[0]);
}