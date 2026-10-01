const PATHS = {
  search: <circle cx="11" cy="11" r="7" />,
  searchHandle: <path d="M20 20l-3.8-3.8" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>,
  heart: <path d="M12 20.5C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.2z" />,
  bag: <><path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></>,
  menu: <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h12" /></>,
  close: <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></>,
  arrowRight: <><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></>,
  arrowLeft: <><path d="M20 12H5" /><path d="M11 6l-6 6 6 6" /></>,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  download: <><path d="M12 4v11" /><path d="M7 11l5 5 5-5" /><path d="M4 20h16" /></>,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  home: <><path d="M4 11.5L12 4l8 7.5" /><path d="M6.5 10.5V20h11v-9.5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  sun: <><circle cx="12" cy="12" r="4.5" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
}

export default function Icon({ name, size = 20, strokeWidth = 1.5, className, filled = false, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
