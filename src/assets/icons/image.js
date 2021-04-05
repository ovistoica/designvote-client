function HangedImage(props) {
  return (
    <svg
      width={50}
      height={62}
      viewBox="0 0 50 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M42.188 21.375H7.812c-.862 0-1.562.7-1.562 1.563v28.125c0 .862.7 1.562 1.563 1.562h34.374c.863 0 1.563-.7 1.563-1.563V22.939c0-.863-.7-1.563-1.563-1.563z"
        stroke="#ABBFC8"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 44.813l9.833-9.833a1.563 1.563 0 012.21 0l8.727 8.728a1.566 1.566 0 001.703.338c.19-.078.362-.193.507-.338l4.04-4.04a1.563 1.563 0 012.21 0l8.27 8.27"
        stroke="#ABBFC8"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.469 33.484a1.953 1.953 0 100-3.906 1.953 1.953 0 000 3.906z"
        fill="#ABBFC8"
      />
      <path d="M7 21.676L25 1M43.629 22.335l-19-21" stroke="#ABBFC8" />
      <circle cx={25} cy={3} r={1.5} fill="#EEF3F4" stroke="#ABBFC8" />
    </svg>
  )
}

export {HangedImage}
