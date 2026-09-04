export function EmptyCartIllustration(props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#3B6FE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M28 34 L34 22 H66 L72 34" />
      <rect x="22" y="34" width="56" height="42" rx="4" />
      <path d="M40 46 a10 10 0 0 0 20 0" />
      <path d="M50 54 l4 4 8-8" strokeWidth="2" />
      <circle cx="20" cy="20" r="1.5" fill="#3B6FE0" stroke="none" />
      <circle cx="80" cy="26" r="2" fill="#3B6FE0" stroke="none" />
      <circle cx="76" cy="16" r="1.2" fill="#3B6FE0" stroke="none" />
    </svg>
  )
}

export function EmptyWishlistIllustration(props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#3B6FE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M28 52 L28 78 L50 84 L72 78 L72 52" />
      <path d="M28 52 L50 46 L72 52 L50 58 Z" />
      <path d="M50 58 V84" />
      <path d="M50 34 c-4-6-14-6-14 2 0 7 14 14 14 14s14-7 14-14c0-8-10-8-14-2z" />
      <circle cx="22" cy="22" r="1.5" fill="#3B6FE0" stroke="none" />
      <circle cx="76" cy="20" r="2" fill="#3B6FE0" stroke="none" />
    </svg>
  )
}
