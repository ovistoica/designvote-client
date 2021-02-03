import {useClient} from 'context/auth-context'
import {useQuery} from 'react-query'

function useDesigns({onSuccess, ...options} = {}) {
  const client = useClient()

  const {data: designs} = useQuery({
    queryKey: 'designs',
    queryFn: () => client('v1/designs'),

    ...options,
  })
  return designs ?? {public: [], drafts: []}
}

export {useDesigns}
