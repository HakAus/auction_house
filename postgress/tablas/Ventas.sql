CREATE TABLE Ventas
(
    IdVenta SERIAL NOT NULL PRIMARY KEY,
    IdSubasta INT NOT NULL,
    IdComprador INT NOT NULL,

    CONSTRAINT FK_Subastas_Ventas
    FOREIGN KEY (IdSubasta)
    REFERENCES Subastas(IdSubasta),

    CONSTRAINT FK_Usuarios_Ventas
    FOREIGN KEY (IdComprador)
    REFERENCES Usuarios(Cedula)
);