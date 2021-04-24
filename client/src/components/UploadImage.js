import React, { Fragment, useState } from "react";

const UploadImage = ({ updateImage }) => {
  //   const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Seleccione una imagen");

  const onChange = (e) => {
    updateImage(e.target.files[0]);
    setFileName(e.target.files.name);
  };

  return (
    <Fragment>
      <form></form>
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          id="imageUpload"
          onChange={onChange}
        />
        <label class="custom-file-label" htmlFor="imageUpload">
          {fileName}
        </label>
      </div>
    </Fragment>
  );
};

export default UploadImage;
