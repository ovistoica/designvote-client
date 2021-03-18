import * as React from 'react'

function Check({stroke, ...restProps}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={41}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <circle
        cx={20}
        cy={20.564}
        r={19.5}
        fill="#FCFDFD"
        stroke={stroke ?? '#ABBFC8'}
      />
      <path
        d="M16.969 24.385l-3.707-4.093L12 21.676l4.969 5.487 10.667-11.779L26.382 14 16.97 24.385z"
        fill="#ABBFC8"
      />
    </svg>
  )
}

export {Check}
