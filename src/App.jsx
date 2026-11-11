import Nav from './components/Nav.jsx'
import Recorrido from './components/Recorrido.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#atencion" onClick={event => { event.preventDefault(); window.dispatchEvent(new CustomEvent('schellhas:navigate', { detail: 'atencion' })) }}>Ir a la atención profesional</a>
      <Nav />
      <main>
        <Recorrido />
      </main>
    </>
  )
}
