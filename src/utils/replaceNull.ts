// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replaceNull<T extends Record<string, any>>(
  obj?: T
): T | undefined {
  if (!obj) {
    return obj;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      obj[key as keyof T] = (
        typeof value === 'number' ? 0 : ''
      ) as typeof value;
    }
  }
  return obj;
}

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function replaceNull(obj: any): object {
//   // edge case
//   if (!obj) {
//     return obj;
//   }

//   // normal case
//   for (const [key, value] of Object.entries(obj)) {
//     if (value === null) {
//       if (typeof value === 'number') {
//         obj[key] = 0;
//       } else {
//         obj[key] = '';
//       }
//     }
//   }
//   return obj;
// }
