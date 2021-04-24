Select * from items
Insert into items(idSubcategoria ,precioBase ,descripcion ,imagen ) values(4,2000,'xBox',null);
Insert into items (idSubcategoria ,precioBase ,descripcion ,imagen ) values(3,1000,'Vida en el tec',null);
Insert into items (idSubcategoria ,precioBase ,descripcion ,imagen ) values(2,3000,'Daft punk album',null);

Select * from Usuarios

Select * from categorias
Insert into categorias (nombre,descripcion) values ('Musica','Es musica')
Insert into categorias (nombre,descripcion)	values('Video Juegos','Vamoh a jugah')
Insert into categorias (nombre,descripcion)	values('Peliculas','Las peliculas')

Select * from subcategorias
Insert into subcategorias (idcategoria,nombre,descripcion) values (1,'Musica Clasica','Es clasica');
Insert into subcategorias (idcategoria,nombre,descripcion) values (1,'Musica Electronica','Si');
Insert into subcategorias (idcategoria,nombre,descripcion) values (2,'Peliculas de Ciencia Ficcion','EAAAA');
Insert into subcategorias (idcategoria,nombre,descripcion) values (3,'Consolas','Pa jugah');

SELECT * FROM SUBASTAS
DECLARE 
fecha timestamp := SYSTIMESTAMP;
BEGIN
DBMS_OUTPUT.PUT_LINE(fecha);
--Los valores aca tienen que se exactos a los de la tabla porque al crearse esta se definieron con "" 
--https://stackoverflow.com/questions/39877393/oracle-11g-ora-00904-error-message-with-insert-statement
INSERT INTO Subastas(iditemsubastado,idvendedor,fechahoracierre,detallesdeentrega) values(3,123115566,SYSTIMESTAMP,'Parque de desampa llamar al vendedor');
INSERT INTO Subastas(iditemsubastado,idvendedor,fechahoracierre,detallesdeentrega) values(4,123115566,SYSTIMESTAMP,'Parque de desampa llamar al vendedor');
END