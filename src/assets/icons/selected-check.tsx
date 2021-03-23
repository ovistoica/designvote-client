import * as React from 'react'

function SelectedCheck({stroke, ...restProps}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={41}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <circle cx={20} cy={20.564} r={20} fill={'#059FA3'} />
      <path
        d="M16.969 23.968l-3.707-3.706L12 21.515l4.969 4.969 10.667-10.667-1.254-1.253-9.413 9.404z"
        fill="#fff"
      />
    </svg>
  )
}

export {SelectedCheck}
