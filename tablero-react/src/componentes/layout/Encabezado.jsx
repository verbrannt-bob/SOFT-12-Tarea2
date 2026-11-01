function Encabezado() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary">
            <div className="container-fluid">
                <div className="navbar-brand d-flex logo">
                    <i className="fa-solid fa-book-open-reader fa-2xl"></i>
                    <h1>Mi LibroLista</h1>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
                    aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="menu">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <a className="nav-link" href="#busqueda">Buscar Libro</a>
                        </li>
                        <li className="navbar-item">
                            <a className="nav-link" href="#lista">Mi lista</a>
                        </li>
                        <li className="navbar-item">
                            <a className="nav-link" href="#proponer">Proponer un Libro al Club</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Encabezado