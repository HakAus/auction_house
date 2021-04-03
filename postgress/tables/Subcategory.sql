CREATE TABLE Subcategory
(
    Id SERIAL NOT NULL PRIMARY KEY,
    CategoryId INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description TEXT NOT NULL,

    CONSTRAINT FK_Category_Subcategory
    FOREIGN KEY (CategoryId)
    REFERENCES Category(Id)
);