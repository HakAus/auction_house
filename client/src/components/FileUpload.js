import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Icon from "@ant-design/icons";
function FileUpload(props) {
  //Hooks
  const [image, setImage] = useState();

  // Functions
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[(0, files[0].name)]);

    //save the Image we chose inside the Node Server
    console.log(files);
    setImage(files[0]);
    props.refreshFunction(files[0]);
  };

  const onDelete = (i) => {
    const currentIndex = image;

    // let newImages = [...Images];
    // newImages.splice(currentIndex, 1);

    setImage(null);
    props.refreshFunction(null);
  };

  // JSX
  return (
    // Contenedor principal
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Título */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <label style={{ textAlign: "left" }}>Imagen del item</label>
      </div>
      {/* Sección de la imagen */}
      <div
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: "300px",
                height: "240px",
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              {console.log("getRootProps", { ...getRootProps() })}
              {console.log("getInputProps", { ...getInputProps() })}
              <input {...getInputProps()} />
              <Icon type="plus" style={{ color: "black", fontSize: "3rem" }} />
            </div>
          )}
        </Dropzone>
        {/* Espacio extra a la derecha */}
        <div
          style={{
            display: "flex",
            width: "350px",
            height: "240px",
            overflowX: "scroll",
          }}
        >
          {
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt={`imagen del producto`}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
