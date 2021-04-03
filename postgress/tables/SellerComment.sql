CREATE TABLE SellerComment
(
    Id SERIAL NOT NULL PRIMARY KEY,
    SaleId INT NOT NULL,
    Comment TEXT NOT NULL,
    CommentDateTime TIMESTAMP NOT NULL,

    CONSTRAINT FK_SellerComment_SalesHistory
    FOREIGN KEY (SaleId)
    REFERENCES SalesHistory(Id)
);