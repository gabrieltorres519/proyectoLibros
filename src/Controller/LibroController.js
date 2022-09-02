/******************************************************************************************************************************************************************/
/* Program Assignment:           Controller para usar los servicios destinados al modelo Libro por el cliente                                                     */
/* Name:                         Gabriel Torres Mendoza                                                                                                           */
/* Date:                         26/05/2022                                                                                                                       */
/* Description:                  Este archivo consta de la clase con el código necesario para que el cliente acceda a la información que necesite desde la vista  */
/******************************************************************************************************************************************************************/

/******************************************************************/
/* Listing Contents:                                              */
/*    Librerías                                                   */
/*      -> MySQL                                                  */
/*    Classes instanciated:                                       */
/*      -> Libro                                                  */
/******************************************************************/


const mysql = require('mysql');
const Libro = require('../Model/Libro');

class LibroController {

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

    /*****************************************************************************************************/
    /*    The method calls the method of the Book model that obtains the 5 most read books in CAADI      */
    /*****************************************************************************************************/

    getPopularBooks(connection, callback){

        const miLibro = new Libro(this.id, this.name ,this.level ,this.category ,this.numReads ,this.type ,this.img ,this.isAudio ,this.nuaAlumno ,this.stars );
        miLibro.getPopularBooks(connection, (result) => {

            // console.log(result)
            callback(result);

        })    
    
      

    }

    /**************************************************************************************************************************************************************/
    /*    The method calls the method of the Book model that gets the searched book in CAADI by name or allows to search all the books of a certain english level */
    /**************************************************************************************************************************************************************/

    getBook(connection, callback){
 
        const miLibro = new Libro(this.id, this.name ,this.level ,this.category ,this.numReads ,this.type ,this.img ,this.isAudio ,this.nuaAlumno ,this.stars );
        miLibro.getBook(connection, (result) => {
            
            // console.log(result)
            callback(result);
        
        });
    
    }

    /**********************************************************************************************************************/
    /*   The method calls the method of the Book model that uses the current times a Book has been read and adds 1 to that number                                */
    /**********************************************************************************************************************/

    addRead(connection, callback){

        const miLibro = new Libro(this.id, this.name ,this.level ,this.category ,this.numReads ,this.type ,this.img ,this.isAudio ,this.nuaAlumno ,this.stars );
        miLibro.addRead(connection, (result) => {
           
            // console.log(result)
            callback(result);

        })
        
    }


    /**********************************************************************************************************************/
    /*    The method calls the method of the Book model that inserts a new book to the database                                                                   */
    /**********************************************************************************************************************/


    addBook(connection, callback){

        const miLibro = new Libro(this.id, this.name ,this.level ,this.category ,this.numReads ,this.type ,this.img ,this.isAudio ,this.nuaAlumno ,this.stars );
        miLibro.addBook(connection, (result)=>{

            // console.log(result)
            callback(result);

        })
    

    }


    /**********************************************************************************************************************/
    /*    The method calls the method of the Book model that inserts the score that the user gives to the specific book                                           */
    /**********************************************************************************************************************/

    rateBook(connection, callback){

        const miLibro = new Libro(this.id, this.name ,this.level ,this.category ,this.numReads ,this.type ,this.img ,this.isAudio ,this.nuaAlumno ,this.stars );
        miLibro.rateBook(connection, (result)=>{

            // console.log(result)
            callback(result);

        })

        
    }
 

}

module.exports = LibroController