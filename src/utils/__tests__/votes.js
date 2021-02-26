import {getVotePercent} from '../votes'
const cases = [
  [0, 0, 0],
  [-2, -2, 0],
  [14, -2, 0],
  [2, 2, 100],
  [10, 7, 70],
  [157, 3, 1.91],
  [200, 19, 9.5],
]

describe("'getVotePercent' utility", () => {
  test.each(cases)(
    'given %p and %p as arguments, returns %p',
    (totalVotes, currentVotes, expectedResult) => {
      const result = getVotePercent(totalVotes, currentVotes)
      expect(result).toEqual(expectedResult)
    },
  )

  test('calling with non-number parameters results in error', () => {
    expect(() => getVotePercent('a', 'b')).toThrowErrorMatchingInlineSnapshot(
      `"Invalid arguments provided. Please provide valid numbers"`,
    )
  })

  test('calling with the total smaller than the part, results in early error', () => {
    expect(() => getVotePercent(10, 11)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid arguments. The total should be bigger than the part"`,
    )
  })
})
