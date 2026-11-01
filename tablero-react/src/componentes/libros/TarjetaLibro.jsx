import { claseEstado } from "../../utils/libros.js"

function TarjetaLibro({ libro, onAvanzar, onQuitar }) {
    return (
        <article className="card h-100 tarjeta-libro">
            <div className="card-body d-flex flex-column">
                <span className={"badge align-self-start mb-2 " + claseEstado(libro.estado)}>
                    {libro.estado}
                </span>
                <h3 className="h6 card-title">{libro.titulo}</h3>
                <p className="card-text small small-secondary mb-3">Escrito: {libro.autor}</p>
                <p className="card-text small small-secondary mb-3">Porpuesta por: {libro.miembro}</p>
                <p className="card-text small small-secondary mb-3">Idioma original: {libro.idiomaOrig}</p>
                <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-sm btn-primary" onClick={() => onAvanzar(libro.id)}>
                        Cambiar estado
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onQuitar(libro.id)}>
                        Quitar
                    </button>
                </div>
            </div>
        </article>  
    )
}

export default TarjetaLibro