import React, { Fragment, useState } from "react";

const PhoneNumberList = ({ telefonos, addPhone, removePhone }) => {
  const [phone, setPhone] = useState(0);

  // update phone variable
  const onChange = (e) => {
    setPhone(e.target.value);
  };
  //   // add function
  //   const addPhone = (e) => {
  //     setPhoneList([...phoneList, phone]);
  //   };

  //   // delete function
  //   const deletePhone = (number) => {
  //     console.log("MATRAFULA");
  //     setPhoneList(phoneList.filter((p) => p !== number));
  //   };

  return (
    <Fragment>
      <input
        name="phoneNumber"
        type="text"
        class="form-control mb-3"
        placeholder="Ingrese un número de teléfono"
        onChange={(e) => onChange(e)}
      ></input>
      <button
        id="add phone number"
        className="btn btn-warning"
        style={{ width: "100%" }}
        onClick={() => addPhone(phone)}
      >
        Agregar número
      </button>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Número</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {telefonos.map((telefono, index) => (
            <tr key={index}>
              <td>{telefono}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removePhone(telefono)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default PhoneNumberList;
