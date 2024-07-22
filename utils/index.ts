export function trymObject(obj: any) {
  Object.keys(obj).map(
    (k) =>
      (obj[k] = obj[k]
        ? typeof obj[k] == 'string'
          ? trym(obj[k])
          : trymObject(obj[k])
        : obj[k])
  )
  return obj
}
function trym(data: string): string {
  return data?.trim().replace(/  +/g, ' ')
}
