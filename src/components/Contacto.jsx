import { motion } from 'motion/react'
import { ArrowUpRight, InstagramLogo, MapPin, WhatsappLogo } from '@phosphor-icons/react'
import { marca, waLink } from '../content.js'
import './Contacto.css'

const EASE = [0.16, 1, 0.3, 1]
const WA = waLink('Hola! Les escribo desde la web.')

export default function Contacto() {
  return (
    <footer className="cont" id="contacto">
      <div className="wrap">
        <div className="cont__head">
          <h2 className="display">Vení a vernos.</h2>
          <a className="btn btn--solid" href={WA} target="_blank" rel="noreferrer">
            <WhatsappLogo size={18} />
            Escribinos
          </a>
        </div>

        <div className="cont__cols">
          <a className="cont__col" href={marca.mapa} target="_blank" rel="noreferrer">
            <MapPin size={22} />
            <span>
              <strong>{marca.direccion}</strong>
              {marca.ciudad}
              <em>{marca.horarios}</em>
            </span>
            <ArrowUpRight size={18} className="cont__arrow" />
          </a>

          <a className="cont__col" href={WA} target="_blank" rel="noreferrer">
            <WhatsappLogo size={22} />
            <span>
              <strong>{marca.telefonos[0]}</strong>
              {marca.telefonos[1]}
              <em>{marca.email}</em>
            </span>
            <ArrowUpRight size={18} className="cont__arrow" />
          </a>

          <a className="cont__col" href={marca.instagram} target="_blank" rel="noreferrer">
            <InstagramLogo size={22} />
            <span>
              <strong>@optica.schellhas.pna</strong>
              Miradas y novedades del local
            </span>
            <ArrowUpRight size={18} className="cont__arrow" />
          </a>
        </div>
      </div>

      {/* Firma gigante: las letras suben una por una al llegar al final. */}
      <motion.div
        className="cont__mark"
        aria-hidden="true"
        initial="abajo"
        whileInView="arriba"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.045 }}
      >
        {'SCHELLHAS'.split('').map((letra, i) => (
          <span className="cont__mask" key={i}>
            <motion.span
              variants={{ abajo: { y: '100%' }, arriba: { y: 0 } }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {letra}
            </motion.span>
          </span>
        ))}
      </motion.div>

      <div className="cont__legal wrap">
        <span>
          © {new Date().getFullYear()} {marca.nombre}
        </span>
        <span>{marca.lema}</span>
      </div>
      <p className="cont__imagery wrap">Los retratos y las escenas de oficio y ambientación son imágenes ilustrativas.</p>
    </footer>
  )
}
