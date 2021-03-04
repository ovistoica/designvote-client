import * as types from 'types'
import {keysToCamel} from './object'
import * as schemas from './schema'
import {normalize} from 'normalizr'

interface DesignEntities {
  version: Record<string, types.Version>
  picture: Record<string, types.Picture>
  design: Record<string, types.Design>
  opinion: Record<string, types.Opinion>
}

export function normalizeDesign(design: types.ApiDesign) {
  const {entities} = normalize<types.Design, DesignEntities>(
    keysToCamel(design),
    schemas.design,
  )
  const designId = design['design-id']
  return {
    design: entities.design[designId],
    pictures: entities.picture,
    versions: entities.version,
    opinions: entities.opinion,
  }
}
