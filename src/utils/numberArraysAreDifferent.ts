export const numberArraysAreDifferent = (
  arr1: number[],
  arr2: number[]
): boolean => {
  if (arr1.length !== arr2.length) return true
  const sortedArr1 = arr1.map((el) => el).sort((a, b) => a - b)
  const sortedArr2 = arr2.map((el) => el).sort((a, b) => a - b)
  for (let i = 0; i < arr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return true
  }
  return false
}
