CREATE OR REPLACE PROCEDURE UPDATE_PARTAKER(pCedula NUMBER,pIdtipo NUMBER,pNickname VARCHAR2,pContrasena VARCHAR2,pNombre VARCHAR2,pPrimerApellido VARCHAR2,pSegundoApellido VARCHAR2,pDireccion VARCHAR2, pCorreo VARCHAR2) AS
BEGIN
    --Primero hacer el select para confirmar el cambio
    UPDATE Usuarios SET cedula = pCedula,idtipo = pIdtipo,nickname = pNinckname,contrasena = pContrasena,nombre = pNombre,primerApellido = pPrimerApellido,segundoapellido = pSegundoApellido,direccion = pDireccion,correo = pCorreo WHERE cedula = pCedula;
END;