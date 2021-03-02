import {useClient} from 'context/auth-context'
import {normalize} from 'normalizr'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {keysToCamel} from './object'
import * as schemas from './schema'

const loadingDesign = {
  name: 'Loading design',
  versions: [],
  totalVotes: 0,
  opinions: [],
}

export function useDesigns({onSuccess, ...options} = {}) {
  const client = useClient()

  const {data: designs, isLoading} = useQuery({
    queryKey: 'designs',
    // normalize result to camelCase
    queryFn: () => client('v1/designs').then(result => keysToCamel(result)),
    ...options,
  })
  return {designs: designs ?? [], isLoading}
}

export function useDesign(designId, {onSuccess, ...options} = {}) {
  const client = useClient()

  const {data, isLoading} = useQuery({
    queryKey: ['design', {designId}],
    queryFn: () =>
      // Normalize the data from the server for faster lookup
      client(`v1/designs/${designId}`).then(result => {
        const {entities} = normalize(keysToCamel(result), schemas.design)
        return {
          design: entities.design[designId],
          pictures: entities.picture,
          versions: entities.version,
          opinions: entities.opinion,
        }
      }),

    ...options,
  })
  return {data: data ?? {design: loadingDesign}, isLoading}
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

export function useCreateDesign(options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    ({name, description = null, img = null}) =>
      client(`v1/designs`, {data: {name, description, img}}),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
    },
  )
}

export function useDeleteDesign(options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    designId => client(`v1/designs/${designId}`, {method: 'DELETE'}),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
    },
  )
}

export function usePublishDesign(designId, options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    () => client(`v1/designs/${designId}/publish`, {method: 'POST'}),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () =>
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]}),
    },
  )
}
