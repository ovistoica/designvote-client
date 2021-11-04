import {Query, QueryClient} from 'react-query'

export function invalidateDesign(
  qc: QueryClient,
  designId: string,
  shortUrl: string,
) {
  qc.invalidateQueries({
    predicate: (query: Query) =>
      query.queryKey[0] === 'design' &&
      ((query.queryKey[1] as {designId: string})?.designId === designId ||
        (query.queryKey[1] as {shortUrl: string})?.shortUrl === shortUrl),
  })
}
