CREATE ROLE APP_AUCTION;
CREATE ROLE user_pool;
CREATE ROLE administrador_subastas; 
CREATE ROLE participante_subastas;

CREATE OR REPLACE FUNCTION casa_subastas.autenticar_usuario(p_alias VARCHAR2,p_contrasena VARCHAR2,p_tipo_usuario VARCHAR2) RETURN SYS_REFCURSOR IS
    user_info SYS_REFCURSOR;
BEGIN
    OPEN user_info FOR
        SELECT U.Cedula, U.Alias
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.Nombre = p_tipo_usuario
        WHERE U.Alias = p_alias AND U.Contrasena = p_contrasena;
    RETURN user_info;
END;
