import { buscarLibros } from "./api.js";
import { mostrarCargando, mostrarError, mostrarResultados, mostrarVacio } from "./render.js";

const formularioBusqueda = document.getElementById('formularioBusqueda')
const inputBusqueda = document.getElementById('inputBusqueda')

formularioBusqueda.addEventListener('submit', async (event) => {
    event.preventDefault()
    const valor = inputBusqueda.value.trim()
    if (valor === '') return mostrarCargando()
    try {
        const libros = await buscarLibros(valor)
        if (libros.length === 0) {
            mostrarVacio(valor)
        } else {
            mostrarResultados(libros)
        }
    } catch (error) {
        console.log(error)
        mostrarError('No se pudo completar la búsqueda. Revise su conexión e intente de nuevo.')
    }
})