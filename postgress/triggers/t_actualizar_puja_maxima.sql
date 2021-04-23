CREATE OR REPLACE FUNCTION t_actualizar_puja_maxima() 
   RETURNS TRIGGER
AS 
$$
DECLARE
    id_puja_maxima INT;
BEGIN
    -- INSERT
    SELECT PM.Id INTO id_puja_maxima
    FROM PujasMaximas PM
    WHERE PM.IdSubasta = new.IdSubasta;

    IF id_puja_maxima <> 0 THEN
        UPDATE PujasMaximas
        SET Monto = new.Monto,
            IdOferta = new.IdOferta,
            IdOfertante = new.IdOfertante
        WHERE IdSubasta = new.IdSubasta;
    ELSE
        INSERT INTO PujasMaximas (IdSubasta, IdOferta, IdOfertante, Monto)
        VALUES (new.IdSubasta, new.IdOferta, new.IdOfertante, new.Monto);
    END IF;

    RETURN new;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER actualizar_puja_maxima
BEFORE INSERT ON Ofertas
FOR EACH ROW EXECUTE PROCEDURE t_actualizar_puja_maxima();