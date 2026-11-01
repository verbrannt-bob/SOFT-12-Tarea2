import { mostrarLista } from "./render.js"
let libros = []
const ESTADOS = ['Pendiente', 'Leyendo', 'Leído']

export function agregarALista(titulo, autor, id) {
    if (!libros.some(libro => libro.id === id)) {
        libros.push({
            id: id,
            titulo: titulo,
            autor: autor,
            estado: "Pendiente"
        })
    } else {

    }
    mostrarLista(libros)
}

export function cambiarEstado(libroID) {
    const estado = libros.find(({ id }) => id === libroID).estado
    const posicion = ESTADOS.indexOf(estado)
    const siguienteEstado = ESTADOS[(posicion + 1) % ESTADOS.length]

    libros = libros.map(libro =>
        libro.id === libroID ? { ...libro, estado: siguienteEstado } : libro
    )

    mostrarLista(libros)
}

export function eliminarLinea(id) {
    const indexLibro = libros.findIndex((libro) => libro.id === id)
    libros.splice(indexLibro, 1)

    mostrarLista(libros)
}
