import './Logo.css'

// Marca tipografica provisoria. TODO: reemplazar por el logo vectorial (SVG) oficial.
export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`} aria-label="Ópticas Schellhas, 135 años">
      <span className="logo__top" aria-hidden="true">Ópticas</span>
      <span className="logo__name" aria-hidden="true">Schellhas</span>
    </span>
  )
}
