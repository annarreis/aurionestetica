import './Wordmark.css'

export default function Wordmark({ size = 'md', className = '' }) {
  return (
    <span className={`wordmark wordmark--${size} ${className}`}>
      <span className="wordmark__name">Aurion</span>
      <span className="wordmark__sub">Estética avançada</span>
    </span>
  )
}
