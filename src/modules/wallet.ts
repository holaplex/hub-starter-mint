export function shorten(address: string): string {
  const length = address.length;

  return `${address.slice(0, 3)}...${address.slice(length - 4, length)}`;
}
