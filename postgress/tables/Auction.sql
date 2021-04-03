CREATE TABLE Auction
(
    Id SERIAL NOT NULL PRIMARY KEY,
    ItemId INT NOT NULL,
    SellerId INT NOT NULL,
    ExpirationDateTime TIMESTAMP NOT NULL,
    DeliveryDetails TEXT NOT NULL,

    CONSTRAINT FK_Item_Auction
    FOREIGN KEY (ItemId)
    REFERENCES Item(Id),

    CONSTRAINT FK_AppUser_Auction
    FOREIGN KEY (SellerId)
    REFERENCES AppUser(IdNumber)
);