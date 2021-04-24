import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Button, Popover } from "antd";

// Aqui tan las pujas
const AuctHistoryView = ({ Subasta, goToSellerHistory }) => {
  const [inputs, setInputs] = useState({
    monto: 0,
  });
  const { monto } = inputs;
  const idsubasta = Subasta.idsubasta;
  const [fechaSubasta, setFechaSubasta] = useState("");
  const [horaSubasta, setHoraSubasta] = useState("");
  const [History, setHistory] = useState([]);

  const getHistory = async () => {
    const body = { idsubasta };
    try {
      const result = await fetch("http://localhost:5000/dashboard/getBids", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseado = await result.json();
      setHistory(parseado);
    } catch (err) {
      console.error(err.message);
    }
  };

  async function getHigherBid() {}

  const onClick = async (e) => {
    await bid();
    await getHistory();
  };

  const bid = async () => {
    const body = { monto, idsubasta };
    try {
      const response = await fetch("http://localhost:5000/dashboard/ofertar", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      if (parseResponse.msg) {
        alert(parseResponse.msg);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let mounted = true;
    const fechaHora = new Date(Subasta.horadecierre);
    console.log("FECHA Y HORA VENIDAS DE LA BASE", fechaHora);
    setFechaSubasta(fechaHora.toLocaleDateString());
    setHoraSubasta(fechaHora.toLocaleTimeString()); // terror
    getHistory();
  }, []);

  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      {console.log(Subasta)}
      <Descriptions title="Información de la subasta" bordered column={2}>
        <Descriptions.Item label="Alias del vendedor">
          {Subasta.aliasvendedor}
        </Descriptions.Item>
        <Descriptions.Item label="Precio base">
          {`₡${Subasta.preciobase}`}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de cierre">
          {fechaSubasta}
        </Descriptions.Item>
        <Descriptions.Item label="Hora de cierre">
          {horaSubasta}
        </Descriptions.Item>
        <Descriptions.Item label="Descripción" span={2}>
          {Subasta.descripcion}
        </Descriptions.Item>
        <Descriptions.Item label="Imagen" span={2}>
          No hay :(
        </Descriptions.Item>
        <Descriptions.Item label="Estado" span={3}>
          <Badge status="processing" text="Activa" />
        </Descriptions.Item>
      </Descriptions>
      <Button style={{ width: "100%" }} onClick={goToSellerHistory}>
        Ver historial del vendedor
      </Button>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <h4>Historial de pujas</h4>
      </div>
      <input
        type="number"
        name="monto"
        placeholder="monto"
        className="form-control my-3"
        value={monto}
        onChange={(e) => onChange(e)}
      />
      <button
        type="fetch-button"
        class="btn btn-light mx-2"
        onClick={(e) => onClick(e)}
      >
        Pujar
      </button>

      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Id Oferta</th>
            <th>Id Ofertante</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>

        {History.length !== 0 ? ( //Tengo que traer el idOferta?
          <tbody>
            {History.map((item) => (
              <tr key={item.p_ifoferta}>
                <td>{item.p_ifoferta}</td>
                <td>{item.p_id_ofertante}</td>
                <td>{item.p_monto}</td>
                <td>{item.p_fecha_tiempo}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            ,<h2> No hay ofertas aún...</h2>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AuctHistoryView;
/**/
