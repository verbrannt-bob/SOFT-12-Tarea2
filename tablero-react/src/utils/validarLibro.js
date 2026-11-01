export function validarLibro(datos) {
  const errores = {}

  if (datos.titulo.trim().length < 2) {
    errores.titulo = 'Escriba un título de al menos 2 caracteres.'
  }

  if (datos.autor === '') {
    errores.autor = 'Escriba un nombre de autor de al menos 2 caracteres.'
  }

  if (datos.idioma === '') {
    errores.idioma = 'Elija el idioma original.'
  }

  if (datos.miembro === '') {
    errores.miembro = 'Indique quién propone el libro.'
  }

  return errores
}