import * as React from 'react'

function OpinionIcon({fill, ...restProps}) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M3.727 15.394a7.872 7.872 0 112.754 2.754h0l-2.72.777a.656.656 0 01-.811-.81l.777-2.72h0z"
        stroke={fill ?? '#000'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.07 19.238a7.88 7.88 0 0011.45 4.16h0l2.72.777a.656.656 0 00.81-.81l-.776-2.72h0A7.877 7.877 0 0017.93 8.761"
        stroke={fill ?? '#000'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export {OpinionIcon}
