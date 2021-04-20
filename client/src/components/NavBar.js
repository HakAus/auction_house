const NavBar = ({ setView, alias }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex flex-row">
      <a class="navbar-brand mx-2" href="#">
        Glecko
      </a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("category_view")}
          >
            Ver categorías
          </button>
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("create_auction_view")}
          >
            Crear subasta
          </button>
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("register_user_view")}
          >
            Registrar usuario
          </button>
          <span class="navbar-text">Conectado como {alias}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
