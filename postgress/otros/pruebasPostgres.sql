Select * from items
Insert into items values(1,4,2000,'xBox',null);
Insert into items values(2,3,1000,'Vida en el tec',null);
Insert into items values(3,2,3000,'Daft punk album',null);

Select * from Usuarios

Select * from categorias
Insert into categorias values (1,'Musica','Es musica')
Insert into categorias	values(3,'Video Juegos','Vamoh a jugah')
Insert into categorias	values(2,'Peliculas','Las peliculas')

Select * from subcategorias
Insert into subcategorias values (1,1,'Musica Clasica','Es clasica');
Insert into subcategorias values (2,1,'Musica Electronica','Si');
Insert into subcategorias values (3,2,'Peliculas de Ciencia Ficcion','EAAAA');
Insert into subcategorias values (4,3,'Consolas','Pa jugah')
--Borrar para hacer el cambio
DROP FUNCTION get_items();
--Insercion de subastas, tomar en cuenta el idDelUsuario
INSERT INTO Subastas values(1,3,111111111,timestamp '20/4/21','Parque de desampa llamar al vendedor')
INSERT INTO Subastas values(2,1,111111111,timestamp '20/4/21','Parque de desampa llamar al vendedor')