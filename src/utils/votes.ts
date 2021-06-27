import * as React from 'react'

import faker from 'faker'
import {useCookies} from 'react-cookie'
import {Vote} from 'types'

export function getVotePercent(totalVotes: number, versionVotes: number) {
  if (totalVotes < versionVotes) {
    throw new Error(
      'Invalid arguments. The total should be bigger than the part',
    )
  }
  if (totalVotes === 0 || totalVotes < 0 || versionVotes < 0) {
    return 0
  }
  const percent = (versionVotes / totalVotes) * 100
  return Math.round(percent * 100) / 100 // round to two decimals
}

function generateVoterId() {
  faker.seed(Date.now())

  return `anonymous|${faker.random.uuid()}`
}

export function useVoterId(): string {
  const [cookies, setCookie] = useCookies(['voterId'])
  const {voterId} = cookies.voterId ?? {voterId: null}
  // TODO Fix this
  const isAuthenticated = false
  const user = {sub: '1234'}

  React.useEffect(() => {
    if (!voterId) {
      const newVoterId = isAuthenticated
        ? user?.sub ?? generateVoterId()
        : generateVoterId()
      setCookie('voterId', {voterId: newVoterId})
    }
  }, [isAuthenticated, setCookie, user?.sub, voterId])

  return voterId
}

export function getAverageRating(votes: Vote[]) {
  const nonNullRatings = votes.filter(v => v.rating !== null)
  if (!nonNullRatings.length) {
    return 0
  }
  const totalRating = nonNullRatings.reduce(
    (total: number, current: Vote) => total + current.rating!,
    0,
  )

  return Math.floor((totalRating / nonNullRatings.length) * 100) / 100
}
