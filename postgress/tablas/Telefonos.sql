CREATE TABLE Telefonos
(
    IdTelefono INT NOT NULL PRIMARY KEY,
    IdUsuario INT NOT NULL,
    Telefono INT NOT NULL,

    CONSTRAINT FK_Usuarios_Telefonos
    FOREIGN KEY (IdUsuario)
    REFERENCES Usuarios(Cedula)
);