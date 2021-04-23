CREATE OR REPLACE PROCEDURE crear_subasta
(
     p_id_item_subastado INT, 
     p_alias_vendedor VARCHAR, 
     p_fecha_hora_cierre TIMESTAMP, 
     p_detalles_de_entrega VARCHAR
)
AS
DECLARE
    id_vendedor INT := 0;
BEGIN

    SELECT U.Cedula INTO id_vendedor FROM Usuarios U WHERE U.Alias = p_alias_vendedor;
    INSERT INTO Subastas (IdItemSubastado, IdVendedor, FechaHoraCierre, DetallesDeEntrega)
    VALUES (p_id_item_subastado, id_vendedor, p_fecha_hora_cierre, p_detalles_de_entrega);
END;