// Componentes propios
import UploadImage from "../components/UploadImage";

import React, { useEffect, useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../components/FileUpload";
import CategorySelectors from "../components/CateogorySelectors";
const { Title } = Typography;
const { TextArea } = Input;

const CreateAuctionView = ({ sellerAlias }) => {
  // Hooks
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  // const [categoryId, setCategoryId] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [basePrice, setBasePrice] = useState(0.0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  // Para traer categorias y categorias de la base de datos
  const getCategories = async () => {
    try {
      return fetch("http://localhost:5000/dashboard/getCategories", {
        method: "POST",
        headers: { token: localStorage.token },
      }).then((data) => data.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSubcategories = async () => {
    try {
      return fetch("http://localhost:5000/dashboard/getSubcategories", {
        method: "POST",
        headers: { token: localStorage.token },
      }).then((data) => data.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  // Traer datos al cargar la pagina
  useEffect(() => {
    let mounted = true;
    getCategories().then((items) => {
      if (mounted) {
        setCategories(items);
      }
    });
    getSubcategories().then((items) => {
      if (mounted) {
        setSubcategories(items);
      }
    });
    return () => (mounted = false);
  }, []);

  // Functions

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Se agrupan los valores recopilados del form
    // const body = {
    //   sellerAlias,
    //   subcategoryId,
    //   description,
    //   basePrice,
    //   date,
    //   time,
    //   // image,
    //   deliveryDetails,
    // };
    const formData = new FormData();
    formData.append("sellerAlias", sellerAlias);
    formData.append("subcategoryId", subcategoryId);
    formData.append("description", description);
    formData.append("basePrice", basePrice);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("image", image);
    formData.append("deliveryDetails", deliveryDetails);

    // Validar
    if (
      // ![
      //   sellerAlias,
      //   subcategoryId,
      //   description,
      //   basePrice,
      //   date,
      //   time,
      //   image,
      //   deliveryDetails,
      // ].every(Boolean)
      true
    ) {
      // Mandar
      const response = await fetch(
        "http://localhost:5000/dashboard/addAuction",
        {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  // JSX
  return (
    <div style={{ maxWidth: "70%", margin: "2rem auto", textAlign: "left" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Agregar Subasta</Title>
      </div>
      <div style={{ textAlign: "left", marginBottom: "2rem" }}>
        <Title level={4}> Detalles del item</Title>
      </div>
      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <UploadImage updateImage={updateImage} />
        {/* <FileUpload refreshFunction={updateImage} /> */}
        {/* Seleccionadores de categoria y subcategoria */}
        <br />
        <br />
        <CategorySelectors
          categories={categories}
          subcategories={subcategories}
          setCategoryId={setSubcategoryId}
          setSubcategoryId={setSubcategoryId}
        />
        <br />
        <br />
        <label>Descripción del item</label>
        <TextArea
          name="descripcion"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <br />
        <label>Precio(₡)</label>
        <Input
          onChange={(e) => setBasePrice(e.target.value)}
          value={basePrice}
          type="number"
        />
        <br />
        <br />
        <label>Fecha de cierre</label>
        <br />
        {/* <DatePicker
          style={{ width: 300 }}
          format="DD/MM/YYYY"
          placeholder="Seleccione una fecha"
          onChange={(e) => setDate(e.format("l"))}
          value={date}
        /> */}
        <Input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          type="text"
        />
        <br />
        <br />
        <label>Hora de cierre</label>
        <br />
        <Input
          onChange={(e) => setTime(e.target.value)}
          value={time}
          type="text"
        />
        {/* <TimePicker
          style={{ width: 300 }}
          placeholder="Seleccione una hora"
          onChange={(e) => setTimeState(e)}
          value={time}
        /> */}
        <br />
        <br />
        <label>Detalles de entrega</label>
        <TextArea
          onChange={(e) => setDeliveryDetails(e.target.value)}
          value={deliveryDetails}
        />
        <br />
        <br />
        <Button style={{ width: "100%" }} onClick={onSubmit}>
          Subastar
        </Button>
      </Form>
    </div>
  );
};

export default CreateAuctionView;
