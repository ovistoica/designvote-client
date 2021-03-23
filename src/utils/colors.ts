export const colorPool = [
  '#DD6E42',
  '#457b9d',
  '#ffb703',
  '#480ca8',
  '#f2cc8f',
  '#aacc00',
  '#da627d',
  '#840032',
  '#f0a6ca',
  '#3d348b',
  '#fedc97',
  '#98DFEA',
  '#8F3985',
  '#25283D',
]

export function generateRandomColors(numberOfColors: number) {
  if (numberOfColors > colorPool.length) {
    throw new Error('Number of colors too big')
  }
  let colors: string[] = []
  let currentPool = [...colorPool]

  while (numberOfColors) {
    const max = currentPool.length
    let randIndex = Math.floor(Math.random() * max)
    colors.push(currentPool[randIndex])

    // remove color from the pool
    currentPool.splice(randIndex, 1)

    numberOfColors = numberOfColors - 1
  }

  return colors
}
