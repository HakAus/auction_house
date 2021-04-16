CREATE TABLE Items
(
    IdItem SERIAL NOT NULL PRIMARY KEY,
    IdSubcategoria INT NOT NULL,
    PrecioBase DECIMAL(9,2) NOT NULL,
    Descripcion TEXT NOT NULL,
    Imagen BYTEA,

    -- TODO: Test
    CONSTRAINT C_Tamano_Imagen
    CHECK (octet_length(Imagen) <= 25 * 1024),

    CONSTRAINT FK_Subcategoria_Items
    FOREIGN KEY (IdSubcategoria)
    REFERENCES Subcategorias(IdSubcategoria)
);