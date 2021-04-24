create or replace PROCEDURE crear_item
(
    p_id_subcategoria NUMBER, 
    p_precio_base NUMBER, 
    p_descripcion VARCHAR2, 
    p_imagen BLOB,
    id_item OUT int
)
AS
BEGIN
    INSERT INTO Items (IdSubcategoria, PrecioBase, Descripcion, Imagen)
    VALUES (p_id_subcategoria, p_precio_base, p_descripcion, p_imagen)
    RETURNING IdItem INTO id_item;
END;