/********************************************************************************************************************************************/
/* Program Assignment:           Modelo del Libro (CRUD)                                                                                    */
/* Name:                         Gabriel Torres Mendoza                                                                                     */
/* Date:                         26/05/2022                                                                                                 */
/* Description:                  Este archivo consta de la clase con el código necesario para realizar los CRUD básicos necesarios          */
/********************************************************************************************************************************************/

/******************************************************************/
/* Listing Contents:                                              */
/*    Librerías                                                   */
/*      -> MySQL                                                  */
/*    Classes instanciated:                                       */
/*      Ninguna                                                   */
/******************************************************************/

const mysql = require('mysql');

class Libro {

    constructor(id, name, level, category, numReads, type, img, isAudio, nuaAlumno, stars){
        this.id = id
        this.name = name
        this.level = level
        this.category = category
        this.numReads = numReads
        this.type = type
        this.img = img
        this.isAudio = isAudio
        this.nuaAlumno = nuaAlumno
        this.stars = stars
    }

    /******************************************************************/
    /*    The method gets the 5 most readed books in CAADI            */
    /******************************************************************/

    getPopularBooks(connection, callback){

        //  1. Obteniendo todos los libros con las calificaciones que le ha dado cada usuario y ordenando 
        // los resultados por número de lecturas para ver los más leídos primero

        // SELECT tbl.*, VisitBook.* FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId 
        // WHERE isAudio = 1 ORDER BY numReads DESC;


        // 2. De la tabla obtenida anteriormente obtener solo un registro por libro y su calificación promedio de todos los usuarios para él

        // SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* FROM (SELECT * FROM Book ORDER BY numReads) 
        // AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = 1 ORDER BY numReads DESC) AS WithCalifs GROUP BY name;


        // 3. Teniendo ya cada ibro y su calificación promedio, obtener los demás datos que necesitamos del libro (nivel y número de lecturas) y ordenar 
        // por número de lecturas.

        // SELECT  nameAndCalifs.PromedioCalifs, Book.*  FROM (SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* 
        // FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = 1 ORDER BY numReads DESC) 
        // AS WithCalifs GROUP BY name) as nameAndCalifs LEFT JOIN Book ON nameAndCalifs.name = Book.name;


        // 4. Ordenar por número de lecturas en orden decendente y dejar que solo sean 5 
        // SELECT  nameAndCalifs.PromedioCalifs, Book.*  FROM (SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* 
        // FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = 1 ORDER BY numReads DESC) 
        // AS WithCalifs GROUP BY name) as nameAndCalifs LEFT JOIN Book ON nameAndCalifs.name = Book.name DESC LIMIT 5 ;
 
        const isAudio = this.isAudio;

        // let getQuery = " SELECT * FROM (SELECT * FROM Book ORDER BY numReads) AS tbl WHERE isAudio = ? ORDER BY numReads DESC LIMIT 5 ;";
        let getQuery = "SELECT  nameAndCalifs.PromedioCalifs, Book.*  FROM (SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = ? ORDER BY numReads DESC) AS WithCalifs GROUP BY name) as nameAndCalifs LEFT JOIN Book ON nameAndCalifs.name = Book.name ORDER BY numReads DESC LIMIT 5 ;"
        connection.query(getQuery, [this.isAudio], function(err, result){
            console.log('Inside getPopularBooks')
            console.log(isAudio)
            if(err) throw err;
            console.log(result)
            callback(result);
        })
    }

    /**********************************************************************************************************************/
    /*    The method gets the searched book in CAADI by name or allows to search all the books of a certain english level */
    /**********************************************************************************************************************/

    getBook(connection, callback){
        const name = this.name; 
        const level = this.level;
        const category = this.category;
        const isAudio = this.isAudio;

        console.log('Inside: '+name+' - '+level+' - '+category);
        if(!level && !name){
            console.log('InsideQuery');
            let getQuery = "SELECT  nameAndCalifs.PromedioCalifs, Book.*  FROM (SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = ? ORDER BY numReads DESC) AS WithCalifs GROUP BY name) as nameAndCalifs INNER JOIN Book ON nameAndCalifs.name = Book.name AND Category = ? ORDER BY numReads;"

            // let getQuery = "SELECT * FROM Book WHERE Category = ? AND isAudio = ?;";
            connection.query(getQuery, [isAudio, category], function(err, result){
                if(err) throw err;
                callback(result);
            })
        }else if(!level){
            let getQuery = "SELECT  nameAndCalifs.PromedioCalifs, Book.*  FROM (SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = ? ORDER BY numReads DESC) AS WithCalifs GROUP BY name) as nameAndCalifs INNER JOIN Book ON nameAndCalifs.name = Book.name AND Book.name = ? ORDER BY numReads;"

            // let getQuery = "SELECT * FROM Book WHERE name = ? AND isAudio = ?;";
            connection.query(getQuery, [isAudio, name], function(err, result){
                if(err) throw err;
                console.log('InsideQuery');
                console.log(result);
                callback(result);
            })
        }else if(!name){
            console.log('InsideQuery');

            let getQuery = "SELECT  nameAndCalifs.PromedioCalifs, Book.*  FROM (SELECT AVG(califAlumno) as PromedioCalifs, WithCalifs.name  FROM (SELECT tbl.*, VisitBook.* FROM (SELECT * FROM Book ORDER BY numReads) AS tbl LEFT JOIN VisitBook ON tbl.id = VisitBook.bookId WHERE isAudio = ? ORDER BY numReads DESC) AS WithCalifs GROUP BY name) as nameAndCalifs INNER JOIN Book ON nameAndCalifs.name = Book.name AND level = ? ORDER BY numReads;"

            // let getQuery = "SELECT * FROM Book WHERE level = ? AND isAudio = ?;";
            connection.query(getQuery, [isAudio, level], function(err, result){
                if(err) throw err;
                callback(result);
            }) 
        }else{
            const warning = {
                warning: 'Busque un libro por nombre o todos los libros de un nivel de inglés'
            };
            callback(warning); 
        }
       
    }

    /**********************************************************************************************************************/
    /*    The method uses the current times a Book has been read and adds 1 to that number                                */
    /**********************************************************************************************************************/

    addRead(connection, callback){
        
        const name = this.name;
        let numReadsAux = this.numReads;

        let numReads = parseInt(numReadsAux, 10);

        console.log(numReads);

        let newNumReads = numReads + 1;

        console.log(newNumReads);

        let updateQuery = 'UPDATE Book SET numReads = ? WHERE name = ?;'
        connection.query(updateQuery, [newNumReads,name], function(err,result){
            if(err) throw err;
            callback(result);
        })
        
    }


    /**********************************************************************************************************************/
    /*    The method inserts a new book to the database                                                                   */
    /**********************************************************************************************************************/


    addBook(connection, callback){

        let insertQuery = 'INSERT INTO Book (name, level, numReads, isAudio, Category, img, state) VALUES (?,?,0,?,?,?,1)';
        connection.query(insertQuery, [this.name,this.level,this.isAudio,this.category,this.img], function(err,result){
            if(err) throw err;
            callback(result);
        })

    }


    /**********************************************************************************************************************/
    /*    The method inserts the score that the user gives to the specific book                                           */
    /**********************************************************************************************************************/

    rateBook(connection, callback){


        console.log('Inside '+this.id+'Inside '+this.nuaAlumno+'Inside '+this.stars)

        let rateQuery = 'INSERT INTO VisitBook (bookId, visitNua, califAlumno) VALUES (?, ?, ?);';
        connection.query(rateQuery, [this.id,this.nuaAlumno, this.stars], function(err,result){
            if(err){ 
                result = {warning: 'You already rated this book before , thank you!!', nuaWrong: 'If that is not the case, you just introduced a wrong NUA!'}
            }else{
                result = {warning: 'Thank you!!', nuaWrong: ''}
            };
            callback(result);
        })
    }


}

module.exports = Libro



