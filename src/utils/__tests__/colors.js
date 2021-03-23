import faker from 'faker'
import {generateRandomColors, colorPool} from '../colors'

let totalColors = colorPool.length
let randomNumColors = faker.random.number({min: 2, max: totalColors - 1})

test('colors are generated from the color pool', () => {
  const randomColors = generateRandomColors(randomNumColors)

  let colorNotIncluded = false
  for (let i = 0; i < randomColors.length; ++i) {
    if (!colorPool.includes(randomColors[i])) {
      colorNotIncluded = true
      break
    }
  }

  expect(colorNotIncluded).toBe(false)
})

test('generated colors are not duplicated', () => {
  const randomColors = generateRandomColors(randomNumColors)
  const resultSet = new Set(randomColors)
  expect(resultSet.size).toEqual(randomColors.length)
})

test('calling with parameter over total colors in colorPool throws error', () => {
  expect(() =>
    generateRandomColors(totalColors + 1),
  ).toThrowErrorMatchingInlineSnapshot(`"Number of colors too big"`)
})
