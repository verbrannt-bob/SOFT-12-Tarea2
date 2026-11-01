const zonaEstado = document.getElementById('estado')
const zonaResultados = document.getElementById('resultados')

function crear(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta)
    if (clase) elemento.className = clase
    if (texto) elemento.textContent = texto
    return elemento
}

export function mostrarCargando() {
    zonaResultados.replaceChildren()
    const caja = crear('div', 'd-flex align-items-center gap-2 text-secondary')
    caja.append(crear('div', 'spinner-border spinner-border-sm'),
        crear('span', '', 'Buscando…'))
    zonaEstado.replaceChildren(caja)
}

export function mostrarError(mensaje) {
    zonaResultados.replaceChildren()
    zonaEstado.replaceChildren(crear('div', 'alert alert-danger mb-0', mensaje))
}

export function mostrarVacio(texto) {
    zonaResultados.replaceChildren()
    zonaEstado.replaceChildren(crear('div', 'alert alert-info mb-0', 'No se encontraron series para «' + texto + '».'))
}

export function mostrarResultados(series) {
    zonaEstado.replaceChildren()
    zonaResultados.replaceChildren(...series.map(crearTarjeta))
}

function crearTarjeta(libro) {
    const columna = crear('div', 'col')
    const tarjeta = crear('article', 'card h-100 tarjeta-libro')
    const imagen = crear('img', 'card-img-bottom')
    imagen.src = libro.portada
    imagen.alt = 'Portada de ' + libro.titulo
    const cuerpo = crear('div', 'card-body cuerpo')
    const autor = libro.autor
    const annio = libro.annio_publicacion ? libro.annio_publicacion : "Fecha de publicacion desconocida"
    cuerpo.append(crear('h3', 'h6 card-title', libro.titulo), crear('p', 'card-text small text-secondary mb-0', 'Por: ' + autor), crear('p', 'card-text small text-secondary mb-0', annio))
    tarjeta.append(cuerpo, imagen)
    columna.append(tarjeta)
    return columna
}