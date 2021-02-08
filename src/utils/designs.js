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

  const {data: design} = useQuery({
    queryKey: ['design', {designId}],
    queryFn: () => client(`v1/designs/${designId}`),

    ...options,
  })
  return design ?? loadingDesign
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

function useCreateDesign(options) {
  const qc = useQueryClient()
  const client = useClient()
  const {mutate} = useMutation(
    ({name, description = null, img = null}) =>
      client(`v1/designs`, {data: {name, description, img}}),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
    },
  )
  return mutate
}

export {useDesigns, useDesign, useCreateDesign}
