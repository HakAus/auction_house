CREATE TABLE ParametrosSistema
(
    Id INT GENERATED ALWAYS AS IDENTITY,
    Mejora DECIMAL(9,2) NOT NULL,
    IncrementoMinimo DECIMAL(9,2) NOT NULL
);

INSERT INTO ParametrosSistema (Mejora, IncrementoMinimo)
VALUES (5, 5000);
