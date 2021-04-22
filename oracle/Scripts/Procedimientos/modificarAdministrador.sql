CREATE PROCEDURE MODIFY_ADMIN(id_no NUMBER,pNombre VARCHAR2,pContrasena VARCHAR2) AS --dEFINIR QUE CAMPOS SE PUEDEN MODIFICAR
BEGIN
    --Primero hacer el select para confirmar el cambio
    UPDATE Administradores SET nombre = pNombre,contrasena = pContrasena WHERE idno = id_no;
END;

SELECT * FROM Administradores

BEGIN 
    MODIFY_ADMIN(3,'benja','mordor');
END;