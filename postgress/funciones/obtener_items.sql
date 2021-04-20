create or replace function get_Items() returns table(idItem int,idSubcategoria int,preciobase numeric(9,2),descripcion text,imagen bytea)
language plpgsql
as $$
begin
return query
	Select * from Items;
end; $$
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION get_Items() SET SCHEMA casa_subastas_schema;
ALTER FUNCTION get_Items() OWNER TO app;
-- GRANT EXECUTE ON FUNCTION get_Items TO administrador_subastas;
GRANT EXECUTE ON FUNCTION get_Items TO participante_subastas;