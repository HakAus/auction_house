CREATE TABLE Usuarios
(
    Cedula INT NOT NULL PRIMARY KEY,
    IdTipo INT NOT NULL,
    Alias VARCHAR(20) NOT NULL, 
    Contrasena VARCHAR(15) NOT NULL,  
    Nombre VARCHAR(100) NOT NULL,
    PrimerApellido VARCHAR(100) NOT NULL,
    SegundoApellido VARCHAR(100) NOT NULL,
    Direccion VARCHAR(300) NOT NULL,
    Correo VARCHAR(200) NOT NULL,

    -- Check that alias is alphanumeric and between 1 and 20 characters
    CONSTRAINT C_Formato_Alias_Valido
    CHECK (Alias ~ '^[A-Za-z0-9]{1,20}$'),
    -- Check that password is between 8 and 15 characters
    CONSTRAINT C_Formato_Contrasena_Valido
    CHECK (Contrasena ~ '^.{8,15}$'),
    CONSTRAINT FK_TipoUsuario_Usuario
    FOREIGN KEY (IdTipo) REFERENCES TiposUsuarios(IdTipo)
    ON DELETE CASCADE
);

INSERT INTO Usuarios
VALUES ('901110498',1,'HakAus','1234qwer','Austin','Hakanson','Hidalgo','Fortuna de Bagaces','austinhakanson@gmail.com');