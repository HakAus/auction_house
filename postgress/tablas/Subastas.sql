CREATE TABLE Subastas
(
    IdSubasta SERIAL NOT NULL PRIMARY KEY,
    IdItemSubastado INT NOT NULL,
    IdVendedor INT NOT NULL,
    FechaHoraCierre TIMESTAMP NOT NULL,
    DetallesDeEntrega TEXT NOT NULL,

    CONSTRAINT FK_Items_Subastas
    FOREIGN KEY (IdItemSubastado)
    REFERENCES Items(IdItem),

    CONSTRAINT FK_Usuarios_Subastas
    FOREIGN KEY (IdVendedor)
    REFERENCES AppUser(IdNumber)
);