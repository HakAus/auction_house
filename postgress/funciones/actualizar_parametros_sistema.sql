CREATE OR REPLACE PROCEDURE actualizar_parametros_sistema(IN p_mejora DECIMAL, IN p_increment_minimo DECIMAL)
AS
$$
BEGIN
    UPDATE ParametrosSistema
    SET Mejora = p_mejora,
        IncrementoMinimo = p_increment_minimo;
END;
$$
LANGUAGE plpgsql;

ALTER PROCEDURE actualizar_parametros_sistema(IN p_mejora DECIMAL, IN p_increment_minimo DECIMAL) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE actualizar_parametros_sistema(IN p_mejora DECIMAL, IN p_increment_minimo DECIMAL) OWNER TO app;

GRANT EXECUTE ON PROCEDURE actualizar_parametros_sistema TO pool_user;

GRANT EXECUTE ON PROCEDURE actualizar_parametros_sistema TO administrador_subastas;