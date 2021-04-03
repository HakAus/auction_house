CREATE TABLE Item
(
    Id SERIAL NOT NULL PRIMARY KEY,
    SubcategoryId INT NOT NULL,
    BasePrice DECIMAL(9,2) NOT NULL,
    Description TEXT NOT NULL,
    Picture BYTEA,

    -- TODO: Test
    CONSTRAINT Check_Picture_FileSize
    CHECK (octet_length(Picture) <= 25 * 1024),

    CONSTRAINT FK_Subcategory_Item
    FOREIGN KEY (SubcategoryId)
    REFERENCES Subcategory(Id)
);