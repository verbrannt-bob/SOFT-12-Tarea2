import { ESTADOS, librosIniciales, IDIOMAS } from "./data/libros";
import Pagina from "./componentes/layout/Pagina.jsx";
import Panel from "./componentes/comunes/Panel.jsx";
import ListaLibros from "./componentes/libros/ListaLibros.jsx"
import { useState } from "react";
import { siguienteEstado } from "./utils/libros.js";
import Resumen from "./componentes/resumen/Resumen.jsx"
import Filtros from './componentes/filtros/Filtros.jsx'
import FormularioLibro from "./componentes/formulario/formularioLibro.jsx";

function App() {
    const [libros, setLibros] = useState(librosIniciales)
    const [filtroEstado, setFiltroEstado] = useState('Todos')
    const [filtroMiembro, setFiltroMiembro] = useState('Todos')
    const [filtroIdioma, setFiltroIdioma] = useState('Todos')
    const visibles = libros.filter(
        (libro) =>
            (filtroEstado === 'Todos' || libro.estado === filtroEstado) &&
            (filtroMiembro === 'Todos' || libro.miembro === filtroMiembro) &&
            (filtroIdioma === 'Todos' || libro.idiomaOrig === filtroIdioma || (filtroIdioma === "Otro" && !IDIOMAS.includes(libro.idiomaOrig)))
    )
    const conteos = ESTADOS.map((estado) => ({
        estado: estado,
        cantidad: libros.filter((libro) => libro.estado == estado).length
    }))

    function agregar(datos) {
        const nueva = { ...datos, id: Date.now(), estado: 'Pendiente' }
        setLibros([...libros, nueva])
    }

    function avanzar(id) {
        const nuevas = libros.map((libro) => libro.id === id ? { ...libro, estado: siguienteEstado(libro.estado) } : libro)
        setLibros(nuevas)
    }

    function quitar(id) {
        const nuevas = libros.filter((libro) => libro.id !== id)
        setLibros(nuevas)
    }

    return (
        <Pagina>
            <div className="row g-4">
                <div className="col-lg-8">
                    <Panel titulo={"Filtros"}>
                        <Filtros
                            estado={filtroEstado}
                            miembro={filtroMiembro}
                            idiomaOrig={filtroIdioma}
                            onCambiarEstado={setFiltroEstado}
                            onCambiarMiembro={setFiltroMiembro}
                            onCambiarIdioma={setFiltroIdioma}
                        />
                    </Panel>
                    <Panel titulo={`Libros del club: ${libros.length}`}>
                        <ListaLibros libros={visibles} onAvanzar={avanzar} onQuitar={quitar}/>
                    </Panel>
                </div>
                <div className="col-lg-4">
                    <Panel titulo="Resumen">
                        <Resumen conteos={conteos}/>
                    </Panel>
                    <Panel titulo={"Agregar un libro"}>
                        <FormularioLibro onAgregar={agregar}></FormularioLibro>
                    </Panel>
                </div>
            </div>
        </Pagina>
    )

}

export default App