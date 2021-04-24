import React, { useState, useEffect } from "react";

// Componentes propios
import UpdateUserView from "./UpdateUserView";

//Creo que me hacen falta las validaciones de autenticcion
const UpdateUserListView = ({ setUpdateUserView }) => {
  const [UserList, setUserList] = useState([]);

  async function getUserList() {
    try {
      return fetch("http://localhost:5000/dashboard/listaUsuarios", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getUserData(cedula) {
    try {
      const body = { cedula };
      const response = await fetch(
        "http://localhost:5000/dashboard/obtenerInfoCompletaUsuario",
        {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const userData = await response.json();
      userData.cedula = cedula; // se le agrega la cédula para saber a quien actualizar
      setUpdateUserView(userData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    let mounted = true;
    getUserList().then((items) => {
      if (mounted) {
        setUserList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Actualización de usuario</h1>
      </div>
      <br />
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Id Usuario</th>
            <th>Alias</th>
            <th>Correo</th>
            <th>Tipo de Usuario</th>
          </tr>
        </thead>

        <tbody>
          {UserList.map((item, index) => (
            // onClick={() => goToUserUpdateView(item)}
            <tr key={index}>
              <td>{item.cedula}</td>
              <td>{item.alias}</td>
              <td>{item.correo}</td>
              <td>{item.tipousuario}</td>
              <button
                type="button"
                class="btn btn-warning"
                onClick={() => getUserData(item.cedula)}
              >
                Edit
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateUserListView;
