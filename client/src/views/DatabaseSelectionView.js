import React, { useEffect, useState } from "react";
import { Typography, Button } from "antd";

const { Title } = Typography;

const DatabaseSelectionView = ({ setDatabase }) => {
  // Functions
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
