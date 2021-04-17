CREATE OR REPLACE PROCEDURE REGISTER_NEW_ADMIN(idno NUMBER,nombre VARCHAR2,contrasena VARCHAR2) AS--Tengo que manejar los errores de claves duplicadas.
BEGIN
    DBMS_OUTPUT.PUT_LINE('This string breaks
    here.');
    INSERT INTO Administradores VALUES(idno,nombre,contrasena);
END;

BEGIN register_new_admin(4,'Beaarto','Breton2');END;

SELECT * FROM Administradores