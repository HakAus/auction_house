import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    alias: "",
    contrasena: "",
    tipo_usuario: "administrador",
  });

  const { alias, contrasena, tipo_usuario } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(); // Evita que se refresque la página, que es el comportamiento por defecto.
    try {
      const body = {
        alias,
        contrasena,
        tipo_usuario,
      };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      // Se guarda el token del usuario
      localStorage.setItem("token", parseResponse.token);
      // Se valida el acceso
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Inicio de sesión</h1>
      <form onSubmit={onSubmitForm}>
        <label>
          <input
            type="radio"
            id="administrador"
            name="tipo_usuario"
            value="administrador"
            checked={tipo_usuario === "administrador"}
            onChange={(e) => onChange(e)}
          />
          Administrador
        </label>
        <label>
          <input
            type="radio"
            id="participante"
            name="tipo_usuario"
            value="participante"
            checked={tipo_usuario === "participante"}
            onChange={(e) => onChange(e)}
          />
          Participante
        </label>

        <input
          type="text"
          name="alias"
          placeholder="Alias"
          className="form-control my-3"
          value={alias}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          className="form-control my-3"
          value={contrasena}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Iniciar sesión</button>
      </form>
      <Link to="/register">Registrarse</Link>
    </Fragment>
  );
};

export default Login;
