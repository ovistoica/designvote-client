import {formatDuration, intervalToDuration} from 'date-fns'

export function formatCreatedAt(createdAt: string) {
  let duration = intervalToDuration({
    start: new Date(createdAt),
    end: new Date(),
  })

  const formattedTimeArray = formatDuration(duration, {delimiter: ','}).split(
    ',',
  )

  if (!formattedTimeArray.length) {
    throw new Error('Invalid date provided')
  }

  return `${formattedTimeArray[0]} ago`
}
