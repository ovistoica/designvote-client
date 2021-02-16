import {useClient} from 'context/auth-context'
import {useQuery, useMutation, useQueryClient} from 'react-query'

const loadingDesign = {name: 'Loading design'}

function useDesigns({onSuccess, ...options} = {}) {
  const client = useClient()

  const {data: designs} = useQuery({
    queryKey: 'designs',
    queryFn: () => client('v1/designs'),

    ...options,
  })
  return designs ?? {public: [], drafts: []}
}

function useDesign(designId, {onSuccess, ...options} = {}) {
  const client = useClient()

  const {data: design, isLoading} = useQuery({
    queryKey: ['design', {designId}],
    queryFn: () => client(`v1/designs/${designId}`),

    ...options,
  })
  return {design: design ?? loadingDesign, isLoading}
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

function useCreateDesign(options = {}) {
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

function useDeleteDesign(options = {}) {
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

export {useDesigns, useDesign, useCreateDesign, useDeleteDesign}
