import React, { useEffect, useState } from "react";
import { Typography, Button } from "antd";

const { Title } = Typography;

const DatabaseSelectionView = ({ setDatabase }) => {
  // Functions
  // const start = async (database) => {
  //   const body = { database };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/auth/selectDatabase",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       }
  //     );
  //     const parseResponse = response.json();
  //     console.log(parseResponse.msg);
  //     setDatabase(database);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // JSX
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Seleccione la base de datos</Title>
      </div>
      <Button onClick={() => setDatabase("pg")}>Postgres</Button>
      <Button onClick={() => setDatabase("oracle")}>Oracle</Button>
    </>
  );
};

export default DatabaseSelectionView;
