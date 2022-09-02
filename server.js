/*****************************************************************************************************************************/
/* Program Assignment:           Servidor - API                                                                              */
/* Name:                         Gabriel Torres Mendoza                                                                      */
/* Date:                         26/05/2022                                                                                  */
/* Description:                  Este archivo consta del código necesario para crear el servidor y ofrecer la API al cliente */
/*****************************************************************************************************************************/

/******************************************************************/
/* Listing Contents:                                              */
/*    Librerías                                                   */
/*      -> Express                                                */
/*      -> MySQL                                                  */
/*      -> cors                                                   */
/*    Classes instanciated:                                       */
/*      -> LibroController                                        */
/******************************************************************/

const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors"); // Resolviendo problema de cors

const LibroController = require('./src/Controller/LibroController');
const { is } = require("express/lib/request");

//Settings-------------------------------------------------------------
app.set('port', process.env.PORT || 3004);
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'CAADI_Libros' 
})

//Motor de pantillas
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use('/public',express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:false})); //Recibir datos de CRUD

//Midlewares-----------------------------------------------------------
app.use(express.json());//Para que el servidor entienda el formato de los datos que vienen del cliente
app.use(cors());

//Server Running-------------------------------------------------------
app.listen(app.get('port'), ()=>{
    console.log(`Server escuchando en el puerto ${app.get('port')}`);
})

//DATABASE Connection--------------------------------------------------
connection.connect((err) =>{ 
    if (err) throw err;
    console.log("Conectado a la base de datos");
})

//Routes---------------------------------------------------------------
app.get('/inicio', (req, res, next) => {
    res.render('REGISTRO_LIBROS', { result: 'undefined'});
});

app.post('/buscador', (req, res, next) => {
    const isAudio = req.body.isAudio;
    console.log(isAudio);
    res.render('REGISTRO_LIBROS_2',{isAudio});
});

app.get('/tryget', async (req, res, next) => {
    res.render('tryget');
})

app.get('/calificar', (req, res, next)=>{
    res.render('rateBook');
})

app.get('/nuevolibro', (req, res, next)=>{
    res.render('REGISTRO_AGREGAR');
})


//API-------------------------------------------------------------------
app.post('/5Populares',(req,res)=>{
    const id = 'default';
    const name = 'default';
    const level = 'default';
    const category = 'default';
    const numReads = 'default';
    const type = 'default';
    const img = 'default';
    const isAudio = req.body.isAudio;
    const nuaAlumno = 'default';
    const stars = 'default';
    const miLibro = new LibroController(id, name, level, category, numReads, type, img, req.body.isAudio, nuaAlumno, stars);
    miLibro.getPopularBooks(connection, (result) => {
        res.render('tryget',{
            'libro': result
        });
        // res.json(result);
    })
}); 

app.post('/Buscar_Libro',(req,res)=>{
    console.log('Body completo: ');
    console.log(req.body);
    console.log('Termina Body completo');
    console.log(req.body.name+' - '+req.body.level+' - '+req.body.category+' - '+req.body.isAudio);
    const nameAux = req.body.name;
    const name = nameAux.toLowerCase();
    const miLibro = new LibroController('default',name, req.body.level, req.body.category, 'default','default','default',req.body.isAudio, 'default','default');
    miLibro.getBook(connection, (result) => {
        // res.json(result);
        
        console.log('API answers: '+result);
        res.render('tryget',{
            'libro': result
        });
        

    });

}); 

app.post('/agrega_lectura',(req,res)=>{
    console.log('Debug agrega lectura');
    const raBook = {
        name: req.body.name,
        img: req.body.img, 
        id: req.body.idBook
    };
    const miLibro = new LibroController('default',req.body.name, 'undefined','undefined', req.body.numReads, 'default','default','default', 'default', 'default');
    miLibro.addRead(connection, (result) => {
        res.render('rateBook',{'book': raBook});
    })
});

app.post('/Insertar_libro',(req, res)=>{
    console.log(req.body.name+' '+req.body.level+' '+req.body.type+' '+req.body.category+' '+req.body.link)
    const nameAux = req.body.name;
    const name = nameAux.toLowerCase();
    // res.send('Endpoint funciona');
    const miLibro = new LibroController('default',name, req.body.level, req.body.category, 'default', req.body.type, req.body.link, req.body.isAudio, 'default', 'default');
    miLibro.addBook(connection, (result)=>{
        res.render('REGISTRO_LIBROS', { result: 'undefined'});
    })

})


app.post('/calificar',(req,res)=>{
    console.log(req.body.name+' '+req.body.estrellas+' '+req.body.nua+' '+req.body.idBook);
    const nameAux = req.body.name;
    const name = nameAux.toLowerCase();
    // res.send('Endpoint funciona');
    const miLibro = new LibroController(req.body.idBook, name, req.body.level, req.body.category, 'default', req.body.type, req.body.link, req.body.isAudio, req.body.nua, req.body.estrellas);
    miLibro.rateBook(connection, (result)=>{
        res.render('REGISTRO_LIBROS', {'result': result});
    })
})