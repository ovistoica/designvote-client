import {useClient} from 'context/auth-context'
import {useQuery, useMutation, useQueryClient} from 'react-query'

function useDesigns({onSuccess, ...options} = {}) {
  const client = useClient()

  const {data: designs} = useQuery({
    queryKey: 'designs',
    queryFn: () => client('v1/designs'),

    ...options,
  })
  return designs ?? {public: [], drafts: []}
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
    },
  )
  return mutate
}

export {useDesigns, useCreateDesign}
