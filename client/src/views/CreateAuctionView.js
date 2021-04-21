import React, { useEffect, useState } from "react";
import {
  Menu,
  Dropdown,
  TimePicker,
  DatePicker,
  Typography,
  Button,
  Form,
  Input,
} from "antd";
import FileUpload from "../components/FileUpload";
const { Title } = Typography;
const { TextArea } = Input;

// Componentes propios

const CreateAuctionView = ({ sellerAlias }) => {
  // Hooks
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
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
    console.log("New image:", newImage);
    setImage(newImage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Se agrupan los valores recopilados del form
    const body = {
      sellerAlias,
      subcategoryId,
      description,
      basePrice,
      date,
      time,
      image,
      deliveryDetails,
    };
    console.log(
      sellerAlias,
      subcategoryId,
      description,
      basePrice,
      date,
      time,
      image,
      deliveryDetails
    );
    // Validar
    if (
      ![
        sellerAlias,
        subcategoryId,
        description,
        basePrice,
        date,
        time,
        image,
        deliveryDetails,
      ].every(Boolean)
    ) {
      // Mandar
      const response = await fetch(
        "http://localhost:5000/dashboard/addAuction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  // Opciones de los dropdown menu
  const opcionesCategoria = (
    <Menu onClick={(e) => setCategoryId(e.key)}>
      {categories.map((item) => (
        <Menu.Item key={item.id} value={item.id}>
          {item.nombre}
        </Menu.Item>
      ))}
    </Menu>
  );

  const opcionesSubcategoria = (
    <Menu onClick={(e) => setSubcategoryId(e.key)}>
      {subcategories.map((item) => (
        <Menu.Item key={item.id} value={item.id}>
          {" "}
          {item.nombre}
        </Menu.Item>
      ))}
    </Menu>
  );

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
        <FileUpload refreshFunction={updateImage} />
        {/* Seleccionadores de categoria y subcategoria */}
        <br />
        <br />
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <td>
            <tr style={{ alignItems: "center" }}>
              <label>Categoría</label>
            </tr>
            <tr>
              <Dropdown overlay={opcionesCategoria}>
                <Button>Seleccione la categoría</Button>
              </Dropdown>
            </tr>
            <tr>
              {" "}
              <label>Usted seleccionó: {categoryId}</label>{" "}
            </tr>
          </td>
          <td>
            <tr>
              <label style={{ marginVertical: 15 }}>Subcategoría</label>
            </tr>
            <tr>
              <Dropdown overlay={opcionesSubcategoria}>
                <Button>Seleccione la subcategoría</Button>
              </Dropdown>
            </tr>
            <tr>
              <label>Usted seleccionó: {subcategoryId}</label>
            </tr>
          </td>
        </table>
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
