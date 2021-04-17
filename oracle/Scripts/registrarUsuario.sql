CREATE PROCEDURE REGISTER_NEW_PARTAKER(cedula NUMBER,idtipo NUMBER,nickname VARCHAR2,contrasena VARCHAR2,nombre VARCHAR2,primerApellido VARCHAR2,segundoApellido VARCHAR2,direccion VARCHAR2, correo VARCHAR2) AS
BEGIN
    INSERT INTO Usuarios VALUES(cedula,idtipo,nickname,contrasena,nombre,primerApellido,segundoapellido,direccion,correo);
END;

BEGIN
    REGISTER_NEW_PARTAKER(3,1,'blop','aans','Hans','Bleki','Bimbo','RUSIA','xd@hotmail.com');
END;

SELECT * FROM Usuarios