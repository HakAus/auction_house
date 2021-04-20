// Bootstrap stuff
import NavBar from "react-bootstrap/Navbar";
import Brand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardNavBar = ({ userType, alias, setView }) => {
  if (userType === "administrador") {
    return (
      <NavBar bg="dark" variant="dark">
        <Brand style={{ color: "#fff" }}>Gleko</Brand>
        <Nav className="mr-auto">
          <NavLink onClickCapture={alert("clicked")} style={{ color: "#ccc" }}>
            Ver categorias
          </NavLink>
          <NavLink onClickCapture={alert("clicked")} style={{ color: "#ccc" }}>
            Ver subastas
          </NavLink>
          <NavLink onClickCapture={alert("clicked")} style={{ color: "#ccc" }}>
            Registrar usuario
          </NavLink>
        </Nav>
        <NavBar.Text>Conectado como:</NavBar.Text>
        <NavLink style={{ color: "#1FF" }}> {alias} </NavLink>
      </NavBar>
    );
  } else {
    return (
      <NavBar bg="dark" variant="dark">
        <Brand style={{ color: "#fff" }}>Gleko</Brand>
        <Nav className="mr-auto">
          <NavLink style={{ color: "#ccc" }}>Ver subastas</NavLink>
          <NavLink onClickCapture={alert("clicked")} style={{ color: "#ccc" }}>
            Crear subasta
          </NavLink>
        </Nav>
        <NavBar.Text>Conectado como:</NavBar.Text>
        <NavLink style={{ color: "#1FF" }}> {alias} </NavLink>
      </NavBar>
    );
  }
};

export default DashboardNavBar;
