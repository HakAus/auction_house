DROP TABLE PujasMaximas;

CREATE TABLE PujasMaximas
(
    Id INT GENERATED ALWAYS AS IDENTITY,
    IdSubasta INT NOT NULL,
    IdOferta INT NOT NULL,
    IdOfertante INT NOT NULL,
    Monto DECIMAL(9,2) NOT NULL,

    CONSTRAINT FK_PujasMaximas_Subastas
    FOREIGN KEY (IdSubasta)
    REFERENCES Subastas(IdSubasta),

    CONSTRAINT FK_PujasMaximas_Ofertas
    FOREIGN KEY (IdOferta)
    REFERENCES Ofertas(IdOferta),

    CONSTRAINT FK_PujasMaximas_Usuarios
    FOREIGN KEY (IdOfertante)
    REFERENCES Usuarios(Cedula)
);