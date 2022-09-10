export function durationConverter(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = (duration - minutes * 60).toFixed(0).padStart(2, "0");
  return `${minutes}:${seconds}`;
}
