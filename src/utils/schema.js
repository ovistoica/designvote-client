import {schema} from 'normalizr'

export const picture = new schema.Entity(
  'picture',
  {
    getId(entity, parent, key) {
      return entity.pictureId
    },
  },

  {idAttribute: 'pictureId'},
)
export const version = new schema.Entity(
  'version',
  {
    pictures: [picture],
    getId(entity, parent, key) {
      return entity.versionId
    },
  },
  {idAttribute: 'versionId'},
)

export const opinion = new schema.Entity(
  'opinion',
  {
    getId(entity, parent, key) {
      return entity.opinionId
    },
  },
  {idAttribute: 'opinionId'},
)

export const design = new schema.Entity(
  'design',
  {
    versions: [version],
    opinions: [opinion],
    getId(entity, parent, key) {
      return entity.designId
    },
  },
  {idAttribute: 'designId'},
)
