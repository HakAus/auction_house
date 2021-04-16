CREATE TABLE ComentariosComprador
(
    Id SERIAL NOT NULL PRIMARY KEY,
    IdVenta INT NOT NULL,
    Comentario TEXT NOT NULL,
    FechaHora TIMESTAMP NOT NULL,

    CONSTRAINT FK_ComentariosComprador_Ventas
    FOREIGN KEY (IdVenta)
    REFERENCES Ventas(IdVenta)
);