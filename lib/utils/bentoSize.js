export function getBentoSizeClasses(bentoSize) {
  const sizeMap = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-2 row-span-1 md:col-span-2 md:row-span-1',
    '1x2': 'col-span-1 row-span-1 md:col-span-1 md:row-span-2',
    '2x2': 'col-span-2 row-span-1 md:col-span-2 md:row-span-2',
  }
  return sizeMap[bentoSize] || sizeMap['1x1']
}
