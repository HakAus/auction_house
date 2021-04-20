Select * from items
Insert into items values(1,4,2000,'xBox',null);
Insert into items values(2,3,1000,'Vida en el tec',null);
Insert into items values(3,2,3000,'Daft punk album',null);

Select * from Usuarios

Select * from categorias
Insert into categorias values (1,'Musica','Es musica')
Insert into categorias	values(3,'Video Juegos','Vamoh a jugah')
Insert into categorias	values(2,'Peliculas','Las peliculas')

Select * from subcategorias
Insert into subcategorias values (1,1,'Musica Clasica','Es clasica');
Insert into subcategorias values (2,1,'Musica Electronica','Si');
Insert into subcategorias values (3,2,'Peliculas de Ciencia Ficcion','EAAAA');
Insert into subcategorias values (4,3,'Consolas','Pa jugah')
--Borrar para hacer el cambio
DROP FUNCTION get_items();
--Trae una tabla con informacion general de las subastas. Pienso que es necesario traer la informacion especifica que se va a usar para la vista
create or replace function get_Items() returnS table(idSubasta int,horaDeCierre timestamp,idItem int,preciobase numeric(9,2),descripcion text,imagen bytea)
language plpgsql
as $$
begin
return query
	SELECT S.idSubasta,S.fechaHoraCierre,I.idItem,I.precioBase,I.descripcion,I.imagen FROM Subastas S
	INNER JOIN Items I ON I.idItem = iditemsubastado;
end; $$
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION get_Items() SET SCHEMA casa_subastas_schema;
ALTER FUNCTION get_Items() OWNER TO app;
GRANT EXECUTE ON FUNCTION get_Items TO administrador_subastas;
GRANT EXECUTE ON FUNCTION get_Items TO participante_subastas;


CREATE OR REPLACE FUNCTION obtener_info_usuario(IN _cedula INT)
RETURNS TABLE (Alias VARCHAR(20), TipoUsuario VARCHAR(50)) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.Alias, TU.Nombre
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
        WHERE U.Cedula = _cedula;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_info_usuario(int) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_info_usuario(int) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_info_usuario TO administrador_subastas;

GRANT EXECUTE ON FUNCTION obtener_info_usuario TO participante_subastas;