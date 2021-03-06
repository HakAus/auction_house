import React, { Fragment, useState } from "react";

import PhoneNumberList from "../components/PhoneNumberList";

const UpdateUserView = ({ user, returnToUserUpdateList }) => {
  const [inputs, setInputs] = useState({
    cedula: user.cedula,
    tipo_usuario: user.tipousuario,
    alias: user.alias,
    contrasena: user.contrasena,
    nombre: user.nombre,
    primer_apellido: user.primerapellido,
    segundo_apellido: user.segundoapellido,
    direccion: user.direccion,
    correo: user.correo,
  });

  const [telefonos, setTelefonos] = useState(user.telefonos);

  const addPhone = (phone) => {
    if (!telefonos.includes(phone)) {
      setTelefonos([...telefonos, phone]);
    } else {
      alert("Número repetido");
    }
  };

  const removePhone = (phone) => {
    setTelefonos(telefonos.filter((p) => p !== phone));
  };

  const {
    cedula,
    tipo_usuario,
    alias,
    contrasena,
    nombre,
    primer_apellido,
    segundo_apellido,
    direccion,
    correo,
  } = inputs;

  const onChange = (e) => {
    console.log(user);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(); // Evita que se refresque la página, que es el comportamiento por defecto.
    try {
      const body = {
        cedula,
        tipo_usuario,
        alias,
        contrasena,
        nombre,
        primer_apellido,
        segundo_apellido,
        direccion,
        correo,
        telefonos,
      };

      console.log("se va a actualizar con estos datos:", body);
      await fetch("http://localhost:5000/dashboard/actualizarUsuario", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div style={{ justifyContent: "left", marginTop: 20 }}>
        <button
          className="btn btn-primary"
          onClick={() => returnToUserUpdateList()}
        >
          Regresar
        </button>
      </div>
      <h1 className="text-center my-5">Actualización de usuario</h1>
      <form onSubmit={onSubmitForm}>
        <label>
          <input
            type="radio"
            id="administrador"
            name="tipo_usuario"
            value="administrador"
            checked={tipo_usuario === "administrador"}
            onChange={(e) => onChange(e)}
            required
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
            required
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
          required
        />
        <input
          type="text"
          name="contrasena"
          placeholder="Contraseña"
          className="form-control my-3"
          value={contrasena}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="form-control my-3"
          value={nombre}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="text"
          name="primer_apellido"
          placeholder="Primer apellido"
          className="form-control my-3"
          value={primer_apellido}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="text"
          name="segundo_apellido"
          placeholder="Segundo Apellido"
          className="form-control my-3"
          value={segundo_apellido}
          onChange={(e) => onChange(e)}
          required
        />
        <textarea
          id="direccion"
          name="direccion"
          placeholder="Dirección"
          cols="30"
          className="form-control my-3"
          value={direccion}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          className="form-control my-3"
          value={correo}
          onChange={(e) => onChange(e)}
          required
        />
        <PhoneNumberList
          telefonos={telefonos}
          addPhone={addPhone}
          removePhone={removePhone}
        />
        <button className="btn btn-success btn-block" onClick={onSubmitForm}>
          Actualizar
        </button>
      </form>
    </Fragment>
  );
};

export default UpdateUserView;
