CREATE OR REPLACE PROCEDURE agregar_telefono
(
    p_id_usuario NUMBER,
    p_telefono NUMBER
)
AS
BEGIN

    INSERT INTO Telefonos (IdUsuario, Telefono)
    VALUES (p_id_usuario, p_telefono);
END;