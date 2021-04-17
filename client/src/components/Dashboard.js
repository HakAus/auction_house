import React, { Fragment, useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {
  const [alias, setAlias] = useState("");

  async function getAlias() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();
      setAlias(parseResponse.alias);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    // Se evita el refreso de la página.
    e.preventDefault();
    // Se elimina el token asignado.
    localStorage.removeItem("token");
    // Se actualiza la autorización a falso.
    setAuth(false);
  };
  useEffect(() => {
    getAlias();
  }, []);
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Bienvenido, {alias} </h2>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Cerrar sesión
      </button>
    </Fragment>
  );
};

export default Dashboard;
