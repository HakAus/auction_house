CREATE TABLE SalesHistory
(
    Id SERIAL NOT NULL PRIMARY KEY,
    AuctionId INT NOT NULL,
    SellerId INT NOT NULL,
    BuyerId INT NOT NULL,

    CONSTRAINT FK_Auction_SalesHistory
    FOREIGN KEY (AuctionId)
    REFERENCES Auction(Id),

    CONSTRAINT FK_AppUser_Seller_SalesHistory
    FOREIGN KEY (SellerId)
    REFERENCES AppUser(IdNumber),

    CONSTRAINT FK_AppUser_Buyer_SalesHistory
    FOREIGN KEY (BuyerId)
    REFERENCES AppUser(IdNumber)
);