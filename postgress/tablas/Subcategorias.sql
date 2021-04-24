CREATE TABLE Subcategorias
(
    IdSubcategoria SERIAL NOT NULL PRIMARY KEY,
    IdCategoria INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,

    CONSTRAINT FK_Categorias_Subcategorias
    FOREIGN KEY (IdCategoria)
    REFERENCES Categorias(IdCategoria)
);