interface Props {
  label?: string
  onClick?: () => void
  href?: string
}

export default function ContactButton({ label = 'Contáctame', onClick, href }: Props) {
  const content = (
    <>
      {label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </>
  )

  const classes = "inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-syne font-bold text-sm tracking-widest uppercase text-white transition-transform duration-200 hover:-translate-y-1"
  const btnStyle = {
    background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
    boxShadow: '0 0 40px rgba(79,127,255,0.25)',
  } as const

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={btnStyle}>
        {content}
      </a>
    )
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button onClick={handleClick} className={classes} style={btnStyle}>
      {content}
    </button>
  )
}
