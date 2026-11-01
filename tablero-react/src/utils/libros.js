import { ESTADOS } from '../data/series.js'

export function siguienteEstado(estado) {
  const posicion = ESTADOS.indexOf(estado)
  return ESTADOS[(posicion + 1) % ESTADOS.length]
}

export function claseEstado(estado) {
  return 'estado-' + estado.toLowerCase().replace(' ', '-')
}