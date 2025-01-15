// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toISOString = (date: any): string => {
  return new Date(date).toISOString();
};

export const fromISOString = (isoString: string): Date => {
  return new Date(isoString);
};
