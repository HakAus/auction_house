CREATE TABLE ComentariosComprador
(
    IdComentario SERIAL NOT NULL PRIMARY KEY,
    IdVenta INT NOT NULL,
    Comentario TEXT NOT NULL,
    FechaHora TIMESTAMP NOT NULL,
    Calificacion VARCHAR NOT NULL,

    CONSTRAINT FK_ComentariosComprador_Ventas
    FOREIGN KEY (IdVenta)
    REFERENCES Ventas(IdVenta)
);