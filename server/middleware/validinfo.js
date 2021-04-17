module.exports = function (req, res, next) {
  function validPassword(userPassword) {
    return /^.{8,15}$/.test(userPassword);
  }

  function validAlias(userAlias) {
    return /^[A-Za-z0-9]{1,20}$/.test(userAlias);
  }

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  function validId(userId) {
    return /^\d{9}$/.test(userId);
  }

  function validLength(text, length) {
    const pattern = `^.{1,${length}}$`;
    let matcher = new RegExp(pattern);
    return matcher.test(text);
  }

  if (req.path === "/register") {
    const {
      cedula,
      tipo_usuario,
      alias,
      contrasena,
      nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
    } = req.body;
    console.log(!contrasena.length);
    if (
      ![
        cedula,
        tipo_usuario,
        alias,
        contrasena,
        nombre,
        primer_apellido,
        segundo_apellido,
        direccion,
        correo,
      ].every(Boolean)
    ) {
      return res.json("Datos incompletos");
    } else if (!validId(cedula)) {
      return res.json("Formato de cédula inválido");
    } else if (!validAlias(alias)) {
      return res.json("Formato de alias inválido");
    } else if (!validPassword(contrasena)) {
      return res.json("Formato de contraseña inválido");
    } else if (!validEmail(correo)) {
      return res.json("Formato de correo inválido");
    } else if (!validLength(nombre, 100)) {
      return res.json(
        "Formato de nombre inválido, debe ser menor a 100 caracteres"
      );
    } else if (!validLength(primer_apellido, 100)) {
      return res.json(
        "Formato de primer apellido inválido, debe ser menor a 100 caracteres"
      );
    } else if (!validLength(segundo_apellido, 100)) {
      return res.json(
        "Formato de segundo apellido inválido, debe ser menor a 100 caracteres"
      );
    } else if (!validLength(direccion, 300)) {
      return res.json(
        "Formato de dirección inválido, debe ser menor a 300 caracteres"
      );
    } else if (!validLength(correo, 200)) {
      return res.json(
        "Formato de correo inválido, debe ser menor a 200 caracteres"
      );
    }
  } else if (req.path === "/login") {
    const { alias, contrasena, tipo_usuario } = req.body;
    console.log(!contrasena.length);
    if (![alias, tipo_usuario, contrasena].every(Boolean)) {
      return res.json("Datos incompletos");
    } else if (!validAlias(alias)) {
      return res.json("Formato de alias inválido");
    } else if (!validPassword(contrasena)) {
      return res.json("Formato de contraseña inválido");
    }
  }

  next(); // para seguir con el siguiente middleware del pipeline
};
