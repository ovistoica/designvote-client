import {schema} from 'normalizr'
import * as types from 'types'

export const picture = new schema.Entity<types.Picture>(
  'picture',
  {},

  {idAttribute: 'pictureId'},
)

export const opinion = new schema.Entity<types.Opinion>(
  'opinion',
  {},
  {idAttribute: 'opinionId'},
)

export const version = new schema.Entity<types.Version>(
  'version',
  {
    pictures: [picture],
    opinions: [opinion],
  },
  {idAttribute: 'versionId'},
)

export const design = new schema.Entity<types.Design>(
  'design',
  {
    versions: [version],
    opinions: [opinion],
  },
  {idAttribute: 'designId'},
)
