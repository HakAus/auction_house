--obtener_usuarios

CREATE OR REPLACE PROCEDURE obtener_usuarios(ret OUT SYS_REFCURSOR) 
AS BEGIN     
  OPEN ret FOR         
    SELECT U.cedula,U.alias,U.correo,U.idtipo 
  FROM Usuarios U; 
END;