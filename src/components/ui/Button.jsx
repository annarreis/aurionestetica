import './Button.css'

/** Link de ação. variant: "solid" | "outline" | "light". Externos abrem em nova aba. */
export default function Button({ href, children, variant = 'solid', icon, className = '', ...rest }) {
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      className={`btn btn--${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="btn__fill" aria-hidden="true" />
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__label">{children}</span>
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  )
}

/** Link textual com traço que se desenha no hover. */
export function TextLink({ href, children, className = '', ...rest }) {
  return (
    <a href={href} className={`tlink ${className}`} {...rest}>
      <span>{children}</span>
      <span className="tlink__line" aria-hidden="true" />
    </a>
  )
}
