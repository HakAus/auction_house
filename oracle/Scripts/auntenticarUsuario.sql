CREATE ROLE APP_AUCTION;
CREATE ROLE user_pool;
CREATE ROLE administrador_subastas; 
CREATE ROLE participante_subastas;

CREATE OR REPLACE FUNCTION autenticar_usuario(palias VARCHAR2,pcontrasena VARCHAR2,ptipoUsuario VARCHAR2) RETURN SYS_REFCURSOR IS
    user_info SYS_REFCURSOR;
BEGIN
    OPEN user_info FOR
        SELECT U.Cedula, U.NickName
        FROM Usuarios U
        INNER JOIN Tipos TU ON TU.Nombre = ptipoUsuario
        WHERE U.NickName = palias AND U.Contrasena = pcontrasena;
    RETURN user_info;
END;
