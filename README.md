<h1 align="center">Hello 👋, This is the Documentation for the Project 'CAADI Books'</h1>
<h3 align="center">Please access the documentation in the link below</h3>

[Notion Project Management](https://useful-square-07f.notion.site/Libros-CAADI-9e7350b02bb947fb990a1022433d67cf)


## To try this project in your machine, please:

1. You have to create the necesary tables in mysql, to do so, in a linux terminal enter mysql -u root -p root
2. Create the tables using the following SQL scripts:

```sql
// Tabla Visit [YA EXISTENTE EN LA BASE DE DATOS DE CAADI]

CREATE TABLE Visit (
    id INT AUTO_INCREMENT primary key,
    periodId INT,
    nua VARCHAR(10),
    skill VARCHAR(40),
    start datetime,
    end datetime  
);

ALTER TABLE Visit 
ADD CONSTRAINT toNUA UNIQUE (visitNua);

// Tabla Book

CREATE TABLE Book (
    id INT AUTO_INCREMENT primary key,
    name VARCHAR(280),
    level ENUM('beginer','intermediate','advanced'),
    numReads INT,
    isAudio  INT,
    Category ENUM('magazines','Reading','other_languages','gramar'),
    img VARCHAR(300),
    state INT  
);

// Tabla VisitBook

CREATE TABLE VisitBook (
    id INT AUTO_INCREMENT primary key,
    bookId INT,
    visitNua VARCHAR(10),
    califAlumno ENUM('1','2','3','4','5'),
    CONSTRAINT fk_bookID FOREIGN KEY(bookId) REFERENCES Book(id) on update cascade on delete cascade,
    CONSTRAINT fk_visitNUA FOREIGN KEY(visitNua) REFERENCES Visit(nua) on update cascade on delete cascade
);
```

3. Clone or download the contents of this repository.
4. Erase the 'view' folder, leaving only the one named 'views'.
5. Use the terminal and while in the project folder insert 'npm install'.
6. Use the correct credentials in the server.js const conection.
7. Define the port you want to use in the server.js app.set('port', process.env.PORT || 3003).
8. Insert npm run start.






