import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import Icon from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const CreateAuctionView = (setAuth) => {
  // Hooks
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);
  const [Images, setImages] = useState([]);

  const [inputs, setInputs] = useState({
    cedula: "",
    tipo_usuario: "administrador",
    alias: "",
    contrasena: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    direccion: "",
    correo: "",
  });

  // Functions
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      /* writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,*/
    };

    /*Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })*/
  };

  // Opciones de los dropdown
  const opcionesCategoria = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
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
        <FileUpload refreshFunction={updateImages} />
        <label style={{ marginVertical: 15 }}>Nombre</label>
        <Input onChange={onTitleChange} value={TitleValue} />
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
          </td>
          <td>
            <tr>
              <label style={{ marginVertical: 15 }}>Subcategoría</label>
            </tr>
            <tr>
              <Dropdown overlay={opcionesCategoria}>
                <Button>Seleccione la subcategoría</Button>
              </Dropdown>
            </tr>
          </td>
        </table>
        <br />
        <br />
        <label>Descripción</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Precio(₡)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <label>Fecha de cierre</label>
        <br />
        <DatePicker
          style={{ width: 300 }}
          format="DD/MM/YYYY"
          placeholder="Seleccione una fecha"
        />
        <br />
        <br />
        <label>Hora de cierre</label>
        <br />
        <TimePicker style={{ width: 300 }} placeholder="Seleccione una hora" />
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
