export default function* range(...args: RangeParameters) {
  const { start, stop, step } = toRangeObject(...args);
  const direction = Math.sign(stop - start);

  if (direction) {
    for (let current = start; Math.sign(stop - current) === direction; current += step) {
      yield current;
    }
  }
}

type RangeParameters =
  | [RangeObjectParameter]
  | [number]
  | [number, number]
  | [number, number, number];

type RangeObjectParameter = { start?: number, stop: number, step?: number }

function toRangeObject(...args: RangeParameters): RangeObject {
  let start, stop, step;

  if (args.length === 1) {
    if (typeof args[0] === "object") {
      start = args[0].start || 0;
      stop = args[0].stop;
      step = args[0].step || Math.sign(stop - start);
    } else {
      start = 0;
      stop = args[0];
      step = Math.sign(stop);
    }
  } else if (args.length === 2) {
    start = args[0];
    stop = args[1];
    step = Math.sign(stop - start) || 1;
  } else {
    start = args[0];
    stop = args[1];
    step = args[2];
  }

  if (step === 0) {
    throw new TypeError("The step value must be nonzero.");
  }

  return { start, stop, step };
}

type RangeObject = Required<RangeObjectParameter>;