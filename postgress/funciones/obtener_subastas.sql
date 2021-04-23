create or replace function obtener_subastas() returnS table(idSubasta int,aliasVendedor VARCHAR, horaDeCierre timestamp,idItem int,preciobase numeric(9,2),descripcion text,imagen bytea)
language plpgsql
as $$
begin
return query
	SELECT S.idSubasta, U.Alias, S.fechaHoraCierre,I.idItem,I.precioBase,I.descripcion,I.imagen FROM Subastas S
    INNER JOIN Usuarios U ON U.Cedula = S.IdVendedor
	INNER JOIN Items I ON I.idItem = iditemsubastado
    ORDER BY S.fechaHoraCierre;
end; $$
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_subastas() SET SCHEMA casa_subastas_schema;
ALTER FUNCTION obtener_subastas() OWNER TO app;
-- GRANT EXECUTE ON FUNCTION obtener_subastas() TO administrador_subastas;
GRANT EXECUTE ON FUNCTION obtener_subastas() TO participante_subastas;