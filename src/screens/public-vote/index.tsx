import {FullPageSpinner} from 'components/lib'
import * as React from 'react'
import {useCookies} from 'react-cookie'
import {useParams} from 'react-router'
import {useUrlDesign} from 'utils/design-query'
import {useVoteDesignVersion} from 'utils/design-query'

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design} = data
  const {
    mutate: vote,
    isSuccess,
    isLoading: isVoteLoading,
  } = useVoteDesignVersion(design.designId)
  const [cookies, setCookie] = useCookies([shortUrl])

  const {voted} = cookies[shortUrl] ?? {voted: false}

  React.useEffect(() => {
    if (!voted && isSuccess) {
      setCookie(shortUrl, {voted: true})
    }
  }, [isSuccess, setCookie, shortUrl, voted])

  if (isLoading || isVoteLoading) {
    return <FullPageSpinner />
  }
  return null
}
