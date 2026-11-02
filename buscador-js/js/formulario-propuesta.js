const btnAgregarAutor = document.getElementById('agregarAutor')
const contenerdorInputsAutores = document.getElementById('contenedor-input-autores')
const objetoFecha = new Date()
const annio = objetoFecha.getFullYear()
const mes = String(objetoFecha.getMonth() + 1).padStart(2, '0')
const dia = String(objetoFecha.getDate()).padStart(2, '0')
const fechaHoy = `${annio}-${mes}-${dia}`
console.log(fechaHoy)

const inputFechaSesion = document.getElementById("fechaSesion")
inputFechaSesion.setAttribute('min', fechaHoy)

btnAgregarAutor.addEventListener('click', () => {
    const nuevoInputCont = document.createElement('div')
    nuevoInputCont.classList = 'input-group d-flex'

    nuevoInputCont.innerHTML = `
        <input type="text" class="form-control mb-3" name="autores[]" placeholder="Nombre de autor" required>
        <button type="button" class="btn btn-outline-danger mb-3" aria-label="Eliminar Input" onclick=this.parentElement.remove()><i class="fa-solid fa-x"></i></button>
    `

    if (contenerdorInputsAutores.childElementCount < 6) {
        contenerdorInputsAutores.appendChild(nuevoInputCont)
    }
})

function obtenerMensajeError(input) {
    const validity = input.validity

    if (validity.valueMissing) {
        return 'Este campo es obligatorio.'
    }
    if (validity.tooShort) {
        return `Debe tener al menos ${input.minLength} caracteres.`
    }
    if (validity.rangeUnderflow) {
        return `El valor mínimo permitido es ${input.min}.`
    }
    if (validity.rangeOverflow) {
        return `El valor máximo permitido es ${input.max}.`
    }
    if (validity.typeMismatch && input.type === 'email') {
        return 'Por favor, ingresa un correo electrónico válido (ejemplo@dominio.com).'
    }
    if (validity.typeMismatch && input.type === 'date') {
        return 'La fecha de la sesión debe estar en el futuro'
    }
    return 'El campo contiene un formato no válido.'
}

function validarCampo(input) {
    const contenedor = input.closest('.col-md-6, .col-12');
    const errorDiv = contenedor ? contenedor.querySelector('.invalid-feedback') : null;

    if (!input.checkValidity()) {
        const mensaje = obtenerMensajeError(input);
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        if (errorDiv) {
            errorDiv.textContent = mensaje
            errorDiv.style.display = 'block'
        }
        return false;
    } else {
        input.classList.remove('is-invalid')
        input.classList.add('is-valid');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none'
        }
        return true;
    }
}


const formPropuesta = document.getElementById('form-propuesta')

import { enviarPropuesta } from './api.js'

formPropuesta.addEventListener('submit', async (event) => {
    event.preventDefault()
    let esFormularioValido = true;


    const inputs = formPropuesta.querySelectorAll('input, textarea')

    inputs.forEach((input) => {
        const campoValido = validarCampo(input);
        if (!campoValido) {
            esFormularioValido = false;
        }
    });

    if (!esFormularioValido) {
        return;
    }

    const formData = new FormData(formPropuesta);
    const propuesta = {
        titulo: formData.get('titulo'),
        autores: formData.getAll('autores[]'),
        annio: Number(formData.get('annio')),
        paginas: Number(formData.get('paginas')),
        correo: formData.get('correo'),
        fechaSesion: formData.get('fechaSesion'),
        motivo: formData.get('motivo')
    };

    try {
        const respuesta = await enviarPropuesta(propuesta);

        mostrarModal('¡Éxito!', 'La propuesta ha sido enviada correctamente.', true)

        formPropuesta.reset();
        inputs.forEach((i) => i.classList.remove('is-valid', 'is-invalid'))
    } catch (error) {

        mostrarModal('Error', 'No se pudo enviar la propuesta: ' + error.message, false)
    }
})


const modalElement = document.getElementById('modalNotificacion');
const modalBS = new bootstrap.Modal(modalElement);
const modalHeader = document.getElementById('modalHeader');
const modalTitle = document.getElementById('modalNotificacionLabel');
const modalBody = document.getElementById('modalNotificacionMensaje');

function mostrarModal(titulo, mensaje, esExito = true) {
    modalTitle.textContent = titulo;
    modalBody.textContent = mensaje;

    if (esExito) {
        modalHeader.className = 'modal-header bg-success text-white'
    } else {
        modalHeader.className = 'modal-header bg-danger text-white'
    }

    modalBS.show();
}