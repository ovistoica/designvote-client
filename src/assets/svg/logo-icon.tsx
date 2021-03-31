import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 30 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.36 0h17.2A3.45 3.45 0 0130 3.44v30.959a3.45 3.45 0 01-3.44 3.44H9.36a3.45 3.45 0 01-3.44-3.44v-3.44c0-.946.775-1.72 1.72-1.72.947 0 1.72.774 1.72 1.72v1.72h17.2V5.159H9.36v1.72c0 .947-.773 1.72-1.72 1.72-.945 0-1.72-.773-1.72-1.72V3.44A3.45 3.45 0 019.36 0zM2.637 18.145l3.302 3.303 9.064-9.116a1.547 1.547 0 012.185 0 1.547 1.547 0 010 2.184L7.125 24.578c-.67.67-1.754.67-2.425 0L.45 20.33a1.547 1.547 0 010-2.184 1.547 1.547 0 012.185 0z"
        fill="#F07320"
      />
    </svg>
  )
}

export const LogoIcon = React.memo(SvgComponent)
