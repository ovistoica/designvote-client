import {useClient} from 'context/auth-context'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {normalizeDesign} from './normalize'
import {keysToCamel} from './object'

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
        return normalizeDesign(result)
      }),

    ...options,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 3,
  })
  return {
    data: data ?? {
      design: loadingDesign,
      pictures: {},
      versions: {},
      opinions: {},
    },
    isLoading,
  }
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

export function useCreateDesign(options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    ({name, description = null, img = null, question = null}) =>
      client(`v1/designs`, {data: {name, description, img, question}}),
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

export function useUrlDesign(shortUrl, {onSuccess, ...options} = {}) {
  const client = useClient()

  const {data, isLoading} = useQuery({
    queryKey: ['design', {shortUrl}],
    queryFn: () =>
      // Normalize the data from the server for faster lookup
      client(`v1/designs/short/${shortUrl}`).then(result => {
        return normalizeDesign(result)
      }),

    ...options,
  })
  return {
    data: data ?? {
      design: loadingDesign,
      pictures: {},
      versions: {},
      opinions: {},
    },
    isLoading,
  }
}

export function useEditDesign(designId, options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  const editDesignAPI = ({
    name = null,
    description = null,
    img = null,
    designType = null,
    publicDesign = null,
  }) => {
    let finalData = {
      name,
      description,
      img,
      'design-type': designType,
      public: publicDesign,
    }
    return client(`v1/designs/${designId}`, {method: 'PUT', data: finalData})
  }
  return useMutation(editDesignAPI, {
    ...defaultMutationOptions,
    ...options,
    onSettled: () =>
      qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]}),
  })
}
