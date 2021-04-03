CREATE TABLE AppUser
(
    IdNumber INT NOT NULL PRIMARY KEY,
    TypeId INT NOT NULL,
    Alias VARCHAR(20) NOT NULL, 
    PasswordKey VARCHAR(15) NOT NULL,  
    Name VARCHAR(100) NOT NULL,
    FirstSurname VARCHAR(100) NOT NULL,
    SecondSurname VARCHAR(100) NOT NULL,
    Address VARCHAR(300) NOT NULL,
    Email VARCHAR(200) NOT NULL,

    -- Check that alias is alphanumeric and between 1 and 20 characters
    CONSTRAINT C_Valid_Alias_Format
    CHECK (Alias ~ '^[A-Za-z0-9]{1,20}$'),
    -- Check that password is between 8 and 15 characters
    CONSTRAINT C_Valid_PasswordKey_Format
    CHECK (PasswordKey ~ '^.{8,15}$'),
    CONSTRAINT FK_UserType_AppUser 
    FOREIGN KEY (TypeId) REFERENCES UserType(Id)
    ON DELETE CASCADE
);