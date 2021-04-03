CREATE TABLE PhoneNumber
(
    Id INT NOT NULL PRIMARY KEY,
    AppUserId INT NOT NULL,
    PhoneNumber INT NOT NULL,

    CONSTRAINT FK_AppUser_PhoneNumber
    FOREIGN KEY (AppUserId)
    REFERENCES AppUser(IdNumber)
);