
CREATE TABLE TiposUsuarios (
    IdTipo GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(50) NOT NULL
);

CREATE TABLE Usuarios(
    Cedula INT CONSTRAINT usario_pk PRIMARY KEY,
    IdTipo INT NOT NULL REFERENCES TiposUsuarios(IdTipo),
    Alias VARCHAR2(20) NOT NULL,
    Contrasena VARCHAR2(15) NOT NULL,
    Nombre VARCHAR2(100) NOT NULL,
    PrimerApellido VARCHAR2(100) NOT NULL,
    SegundoApellido VARCHAR2(100),
    Direccion VARCHAR2(300)NOT NULL, 
    Correo VARCHAR2(200) NOT NULL
);

CREATE TABLE Telefonos(
    IdTelefono INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdUsuario INT NOT NULL REFERENCES Usuarios(Cedula),
    Telefono INT NOT NULL -- por qué no un INT?
);

CREATE TABLE Ventas(
    IdVenta INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdSubasta INT NOT NULL REFERENCES Subastas(IdSubasta),
    IdComprador INT NOT NULL REFERENCES Usuarios(Cedula)
);

CREATE TABLE ComentarioVendedor(
    IdComentario INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdVenta INT NOT NULL REFERENCES Ventas(IdVenta),
    Comentario VARCHAR2(800) NOT NULL,
    FechaHora TIMESTAMP  NOT NULL
);

CREATE TABLE ComentarioComprador(
    IdComentario INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdVenta INT NOT NULL REFERENCES Ventas(IdVenta),
    Comentario VARCHAR2(800) NOT NULL,
    FechaHora TIMESTAMP  NOT NULL,
    Calificacion NUMBER(1) NOT NULL
);

CREATE TABLE Subastas(
    IdSubasta INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdItemSubastado INT NOT NULL REFERENCES Items(IdItem),
    IdVendedor INT NOT NULL REFERENCES Usuarios(Cedula),
    FechaHoraCierre TIMESTAMP  NOT NULL,
    DetallesDeEntrega VARCHAR2(800) 
);

CREATE TABLE Ofertas(
    IdOferta INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdSubasta INT NOT NULL REFERENCES Subastas(IdSubasta),
    IdOfertante INT NOT NULL REFERENCES Usuarios(Cedula),
    Monto DECIMAL(9,2) NOT NULL,
    FechaTiempo TIMESTAMP  NOT NULL,
    Ganadora CHAR(1) NOT NULL
);

CREATE TABLE Items(
    IdItem INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdSubcategoria INT NOT NULL REFERENCES Subcategorias(IdSubcategoria),
    PrecioBase DECIMAL(9,2) NOT NULL,
    Descripcion VARCHAR2(800),
    Imagen BLOB
);

CREATE TABLE Categorias(
    IdCategoria INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(100) NOT NULL,
    Descripcion VARCHAR2(800) NOT NULL
);

CREATE TABLE Subcategorias(
    IdSubcategoria INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdCategoria INT NOT NULL REFERENCES Categorias(IdCategoria),
    Nombre VARCHAR2(100) NOT NULL,
    Descripcion VARCHAR2(800) NOT NULL
);