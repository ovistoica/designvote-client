import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.662 4.734s-.271 3.368-.429 4.786c-.075.678-.493 1.075-1.179 1.087-1.304.024-2.61.025-3.914-.002-.66-.014-1.071-.416-1.145-1.081-.158-1.431-.428-4.79-.428-4.79M10.354 3.12H1.875M8.72 3.12a.824.824 0 01-.807-.662L7.79 1.85a.64.64 0 00-.618-.475H5.056a.64.64 0 00-.618.475l-.122.608a.824.824 0 01-.807.662"
        stroke={props.fill ?? '#FCFDFD'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const DeleteBin = React.memo(SvgComponent)