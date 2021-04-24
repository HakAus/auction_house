CREATE OR REPLACE FUNCTION hacer_puja(IN _alias VARCHAR(255), IN _contrasena VARCHAR(15), IN _tipoUsuario VARCHAR(50))
RETURNS int (Cedula INT, Alias VARCHAR(20)) AS
$$
BEGIN

END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;



ALTER FUNCTION hacer_puja(numeric(9,2)) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION hacer_puja() OWNER TO app;

GRANT EXECUTE ON FUNCTION hacer_puja TO pool_user;