import React, { useEffect, useState } from "react";
import { Button, Input, notification } from "antd";

const SetSystemParametersView = () => {
  const [mejora, setMejora] = useState(0.0);
  const [incrementoMinimo, setIncrementoMinimo] = useState(0.0);

  const getSystemParameters = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/getSystemParameters",
        {
          method: "GET",
          headers: {
            token: localStorage.token,
            "Content-Type": "application-json",
          },
        }
      );
      const parseResponse = await response.json();
      setMejora(parseResponse.mejora);
      setIncrementoMinimo(parseResponse.incrementominimo);

      console.log("Parametros de sistema traidos de la base", parseResponse);
    } catch (err) {
      console.error(err.message);
      alert(
        "Hubo un error en el servidor al traer los parámetros del sistema "
      );
    }
  };

  useEffect(() => {
    getSystemParameters();
  }, []);

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const body = {
        mejora: mejora,
        incrementoMinimo: incrementoMinimo,
      };
      console.log("Se va a mandar esto: ", body);
      const response = await fetch(
        "http://localhost:5000/dashboard/updateSystemParameters",
        {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "application-json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseResponse = await response.json();
      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);

      alert(
        "Hubo un error en el servidor al actualizar los parámetros del sistema"
      );
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <label>Mejora</label>
      <Input
        placeholder="Mejora"
        value={mejora}
        onChange={(e) => setMejora(e.target.value)}
      />
      <br />
      <br />
      <label>Incremento mínimo</label>
      <Input
        placeholder="Incremento Mínimo"
        value={incrementoMinimo}
        onChange={(e) => setIncrementoMinimo(e.target.value)}
      />
      <br />
      <br />
      <Button type="fetch-button" onClick={(e) => onClick(e)}>
        {" "}
        Actualizar
      </Button>
    </>
  );
};

export default SetSystemParametersView;
