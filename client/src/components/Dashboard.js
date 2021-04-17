import React, { Fragment } from "react";

const Dashboard = ({ setAuth }) => {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Cerrar sesión</button>
    </Fragment>
  );
};

export default Dashboard;
