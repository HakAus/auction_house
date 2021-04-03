CREATE TABLE Bid
(
    Id SERIAL NOT NULL PRIMARY KEY,
    AuctionId INT NOT NULL,
    BidderId INT NOT NULL,
    Amount DECIMAL(9,2) NOT NULL,
    BidDateTime TIMESTAMP NOT NULL,
    Winner BOOLEAN NOT NULL,

    CONSTRAINT FK_Auction_Bid
    FOREIGN KEY (AuctionId)
    REFERENCES Auction(Id),

    CONSTRAINT FK_AppUser_Bid
    FOREIGN KEY (BidderId)
    REFERENCES AppUser(IdNumber)
);