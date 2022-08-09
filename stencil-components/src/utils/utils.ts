export function getUniqueKey (baseString?:string) {
  const keyBaseString =  baseString ? baseString : '';
  let d = Date.now();
  d = Math.floor(d * Math.random());
  return keyBaseString + d;
}
