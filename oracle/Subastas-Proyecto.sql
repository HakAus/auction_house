
CREATE TABLE TiposUsuarios (
    IdTipo INT CONSTRAINT tipos_pk PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
); -- le cambie el nombre

CREATE TABLE Usuarios(
    Cedula INT CONSTRAINT usario_pk PRIMARY KEY,
    IdTipo INT NOT NULL REFERENCES Tipos(IdTipo),
    Alias VARCHAR(100) NOT NULL,
    Contrasena VARCHAR(15) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    PrimerApellido VARCHAR(100) NOT NULL,
    SegundoApellido VARCHAR(100),
    Direccion VARCHAR(300)NOT NULL, 
    Correo VARCHAR(200) NOT NULL
);

CREATE TABLE Telefonos(
    IdTelefono int CONSTRAINT telefono_pk PRIMARY KEY,
    IdUsuario INT NOT NULL REFERENCES Usuarios(Cedula), -- le cambie el nombre (15/04/2021)
    Telefono VARCHAR(20) NOT NULL -- por qué no un INT?
);

CREATE TABLE HistorialVentas(
    IdVenta INT CONSTRAINT historialventas_pk PRIMARY KEY,  -- cambie el nombre
    IdSubasta INT NOT NULL REFERENCES Subastas(IdSubasta),
    IdComprador INT NOT NULL REFERENCES Usuarios(Cedula)
);

CREATE TABLE ComentarioVendedorH(
    IdVenta INT NOT NULL REFERENCES HistorialVentas(IdHistorial),
    Comentario VARCHAR(800) NOT NULL,
    FechaHora TIMESTAMP  NOT NULL
);

CREATE TABLE ComentarioCompradorH(
    IdVenta INT NOT NULL REFERENCES HistorialVentas(IdHistorial),
    Comentario VARCHAR(800) NOT NULL,
    FechaHora TIMESTAMP  NOT NULL,
    Calificacion NUMBER(1) NOT NULL
);

CREATE TABLE Subastas(
    IdSubasta INT CONSTRAINT subasta_pk PRIMARY KEY,
    IdItemSubastado INT NOT NULL REFERENCES Items(IdItem),
    IdVendedor INT NOT NULL REFERENCES Usuarios(Cedula),
    FechaHoraCierre TIMESTAMP  NOT NULL,
    DetallesDeEntrega VARCHAR(800) 
);

CREATE TABLE Ofertas(
    Id INT CONSTRAINT oferta_pk PRIMARY KEY,
    IdSubasta INT NOT NULL REFERENCES Subastas(IdSubasta),
    IdOfertante INT NOT NULL REFERENCES Usuarios(Cedula),
    Monto DECIMAL(9,2) NOT NULL,
    FechaTiempo TIMESTAMP  NOT NULL,
    GANADORA NUMBER(1) NOT NULL --A discutir
);

CREATE TABLE ComentarioVendedorS(
    Id INT CONSTRAINT comentariovendedor_S_pk PRIMARY KEY,
    IdSubasta INT NOT NULL REFERENCES Subastas(IdSubasta),
    Comentario VARCHAR(800) NOT NULL,
    FechaHora TIMESTAMP  NOT NULL
);

CREATE TABLE ComentarioCompradorS(
    Id INT CONSTRAINT comentariocomprador_S_pk PRIMARY KEY,
    IdSubasta INT NOT NULL REFERENCES Subastas(IdSubasta),
    Comentario VARCHAR(800) NOT NULL,
    FechaHora TIMESTAMP  NOT NULL,
    Calificacion NUMBER(1) NOT NULL
);

CREATE TABLE Items(
    IdItem INT CONSTRAINT item_pk PRIMARY KEY,
    IdSubcategoria INT NOT NULL REFERENCES Subcategorias(IdSubcategoria),
    PrecioBase DECIMAL(9,2) NOT NULL,
    Descripcion VARCHAR(800),
    Imagen BLOB
);

CREATE TABLE Categorias(
    IdCategoria INT CONSTRAINT categoria_pk PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(800) NOT NULL
);

CREATE TABLE Subcategorias(
    IdSubcategoria INT CONSTRAINT subcategoria_pk PRIMARY KEY,
    IdCategoria INT NOT NULL REFERENCES Categorias(IdCategoria),
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(800) NOT NULL
);