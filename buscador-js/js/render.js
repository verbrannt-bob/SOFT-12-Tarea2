const zonaEstado = document.getElementById('estado')
const zonaResultados = document.getElementById('resultados')
const zonaModales = document.getElementById('modales')

function crear(etiqueta, clase, texto, id) {
    const elemento = document.createElement(etiqueta)
    if (clase) elemento.className = clase
    if (texto) elemento.textContent = texto
    if (id) elemento.id = id
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

export function mostrarResultados(libros) {
    zonaEstado.replaceChildren()
    zonaResultados.replaceChildren(...libros.map(crearTarjeta))
    zonaModales.replaceChildren(...libros.map(crearModal))
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
    const btn = crear('button', 'btn btn-primary', 'Detalles')
    btn.setAttribute('data-bs-toggle', 'modal')
    btn.setAttribute('data-bs-target', '#modal-' + libro.id)
    cuerpo.append(crear('h3', 'h6 card-title', libro.titulo), crear('p', 'card-text small text-secondary mb-0', 'Por: ' + autor), crear('p', 'card-text small text-secondary mb-0', annio))
    tarjeta.append(cuerpo, imagen, btn)
    columna.append(tarjeta)
    return columna
}

function crearModal(libro) {
    // const modal = crear('article', 'modal fade modal-dialog-centered', '' ,'modal-' + libro.id)
    // const contenedor = crear('div', 'detalle-libro')
    // const imagen = crear('img')
    // imagen.src = libro.portada
    // imagen.alt = 'Portada de ' + libro.titulo
    // const titulo = crear('h3', '', libro.titulo)
    // const autor = crear('h4', '', libro.autor)
    // const annio = crear('p', 'annio')
    // const disp_spa = libro.disp_spa ? "Sí" : "No"
    // const disponibilidad = crear('p', 'disponibilidad', 'Disponible en español: ' + disp_spa)

    const modal = crear('div', 'modal', '', 'modal-'+ libro.id)
    modal.setAttribute('tabindex', '-1')
    const dialog = crear('div', 'modal-dialog')
    const content = crear('div', 'modal-content')
    const header = crear('div', 'modal-header')
    const titulo = crear('h3', 'modal-title', libro.titulo)
    const btnX = crear('button', 'btn-close')
    btnX.setAttribute('type', 'button')
    btnX.setAttribute('data-bs-dismiss', 'modal')
    btnX.setAttribute('aria-label', 'Cerrar')
    const body = crear('div', 'modal-body cuerpo-detalles')
    const imagen = crear('img', 'img-detalles')
    imagen.src = libro.portada
    imagen.alt = 'Portada de ' + libro.titulo
    const autor = crear('p', 'detalle-autor', 'Por:' + libro.autor)
    const annio = crear('p', 'detalle-annio', libro.annio_publicacion ? libro.annio_publicacion : "Fecha de publicacion desconocida")
    const disp_spa = crear('p', 'detalles-disp', 'Disponible en español: ' + (libro.disp_spa ? "Sí" : "No"))
    const footer = crear('div', 'modal-footer')
    const btnCerrar = crear('button', 'btn btn-secondary', 'Cerrar')
    btnCerrar.setAttribute('type', 'button')
    btnCerrar.setAttribute('data-bs-dismiss', 'modal')
    const btnAgregar = crear('button', 'btn btn-primary', 'Agregar a mi lista', 'agregarLibro')
    btnAgregar.setAttribute('type', 'button')
    btnAgregar.setAttribute('data-bs-dismiss', 'modal')


    header.append(titulo, btnX)
    body.append( imagen ,autor, annio, disp_spa)
    footer.append(btnCerrar, btnAgregar)
    content.append(header, body, footer)
    dialog.append(content)
    modal.append(dialog)

    // contenedor.append(imagen, titulo, autor, annio, disponibilidad)
    return modal
}