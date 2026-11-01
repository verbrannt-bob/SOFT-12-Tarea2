const URL_BUSQUEDA = 'https://openlibrary.org/search.json?q={texto}&limit=12'
const URL_PORTADA = 'https://covers.openlibrary.org/b/id/{cover_i}-M.jpg'
const URL_PROPUESTAS = 'https://jsonplaceholder.typicode.com/posts'

export async function buscarLibros(texto) {
    const respuesta = await fetch(URL_BUSQUEDA.replace("{texto}", encodeURIComponent(texto)))
    if (!respuesta.ok) {
        throw new Error('La API respondió con el código ' + respuesta.status)
    }

    const datos = await respuesta.json()
    return datos.docs.map((resultado) => ({
        titulo: resultado.title,
        autor: resultado.author_name,
        annio_publicacion: resultado.first_publish_year,
        portada: resultado.cover_i ? URL_PORTADA.replace("{cover_i}", resultado.cover_i) : 'assets/sin-portada.jpg',
        disp_spa: resultado.language.includes("spa"),
        id: resultado.key
    }))
}

