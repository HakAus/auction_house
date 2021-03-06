const AdminNavBarOptions = ({ setView, logout }) => {
  return (
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("register_user_view")}
          >
            Registrar usuario
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("update_user_list_view")}
          >
            Actualizar usuario
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("system_parameters_view")}
          >
            Actualizar parámetros del sistema
          </button>
        </li>
        <li>
          <button className="btn btn-primary mx-2" onClick={(e) => logout(e)}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

const ParticipanteNavBarOptions = ({ setView, setModo, logout }) => {
  return (
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("category_view")}
          >
            Categorías
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("user_list")}
          >
            Usuarios
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => setView("create_auction_view")}
          >
            Agregar subasta
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => {
              setModo("compra");
              setView("user_auct_list");
            }}
          >
            Mis compras
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={() => {
              setModo("venta");
              setView("user_auct_list");
            }}
          >
            Mis subastas
          </button>
        </li>
        <li class="nav-item mx-2">
          <button className="btn btn-primary " onClick={(e) => logout(e)}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

const NavBar = ({ setView, setModo, alias, userType, logout }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row">
      <a class="navbar-brand mx-2" href="#">
        Glecko
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      {userType === "administrador" ? (
        <AdminNavBarOptions setView={setView} alias={alias} logout={logout} />
      ) : (
        <ParticipanteNavBarOptions
          setView={setView}
          setModo={setModo}
          alias={alias}
          logout={logout}
        />
      )}
      <span class="navbar-text">Conectado como </span>
      <span class="navbar-text mx-2" style={{ color: "#1ff" }}>
        {alias}
      </span>
    </nav>
  );
};

export default NavBar;
