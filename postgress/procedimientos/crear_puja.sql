
CREATE OR REPLACE PROCEDURE crear_puja
(
    IN p_monto DECIMAL(9,2),
    IN p_id_usuario int,
    IN p_id_subasta int,
    IN OUT p_estado INT
)
AS
$$
BEGIN
    INSERT INTO Ofertas(IdSubasta,IdOfertante,monto,fechatiempo,ganadora) --Considerar que necesito retornar
    VALUES (p_id_subasta,p_id_usuario,p_monto,CURRENT_TIMESTAMP(2),0);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_puja(DECIMAL(9,2),int,int,int) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_puja(DECIMAL(9,2),int,int,int) OWNER TO app;

--GRANT EXECUTE ON PROCEDURE crear_puja TO administrador_subastas;

GRANT EXECUTE ON PROCEDURE crear_puja TO participante_subastas;