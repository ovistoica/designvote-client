import {normalize} from 'normalizr'
import * as types from 'types'

import {keysToCamel} from './object'
import * as schemas from './schema'

interface DesignEntities {
  version: Record<string, types.Version>
  picture: Record<string, types.Picture>
  design: Record<string, types.Design>
  opinion: Record<string, types.Opinion>
}

interface PollEntities {
  version: Record<string, types.PollVersion>
  poll: Record<string, types.Poll>
}

export function normalizeDesign(
  design: types.ApiDesign,
): types.NormalizedDesign {
  const {entities} = normalize<types.Design, DesignEntities>(
    keysToCamel<types.ApiDesign, types.Design>(design),
    schemas.design,
  )
  const designId = design['design-id']
  const normalisedDesign = entities.design[designId]
  return {
    design: {
      ...normalisedDesign,
      versions: normalisedDesign.versions ?? [],
      opinions: normalisedDesign.opinions ?? [],
    },
    pictures: entities.picture,
    versions: entities.version,
    opinions: entities.opinion,
  }
}

export function normalizePoll(poll: types.ApiPoll): types.NormalizedPoll {
  const {entities} = normalize<types.Poll, PollEntities>(poll, schemas.poll)
  const normalisedPoll = entities.poll[poll.pollId]
  return {
    poll: {
      ...normalisedPoll,
      versions: normalisedPoll.versions ?? [],
    },
    versions: entities.version,
  }
}
