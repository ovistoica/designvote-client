export function getVotePercent(totalVotes: number, versionVotes: number) {
  if (typeof totalVotes !== 'number' || typeof versionVotes !== 'number') {
    throw new Error('Invalid arguments provided. Please provide valid numbers')
  }

  if (totalVotes < versionVotes) {
    throw new Error(
      'Invalid arguments. The total should be bigger than the part',
    )
  }
  if (totalVotes === 0 || totalVotes < 0 || versionVotes < 0) {
    return 0
  }
  const percent = (versionVotes / totalVotes) * 100
  return Math.round(percent * 100) / 100 //round to two decimals
}
