CREATE TABLE Ofertas
(
    Id SERIAL NOT NULL PRIMARY KEY,
    IdSubasta INT NOT NULL,
    IdOfertante INT NOT NULL,
    Monto DECIMAL(9,2) NOT NULL,
    FechaTiempo TIMESTAMP NOT NULL,
    Ganadora BOOLEAN NOT NULL,

    CONSTRAINT FK_Subastas_Ofertas
    FOREIGN KEY (IdSubasta)
    REFERENCES Subastas(IdSubasta),

    CONSTRAINT FK_Usuarios_Ofertas
    FOREIGN KEY (IdOfertante)
    REFERENCES Usuarios(Cedula)
);