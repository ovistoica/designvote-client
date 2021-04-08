import {useClient} from 'context/auth-context'
import {useMutation, useQueryClient} from 'react-query'

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
