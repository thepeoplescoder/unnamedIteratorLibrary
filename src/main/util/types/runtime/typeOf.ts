export default function typeOf(x: any): string {
  return Object.prototype.toString.call(x).slice("[object ".length, -1);
}