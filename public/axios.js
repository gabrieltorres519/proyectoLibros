// import axios from 'axios';
const buttonFisicalBook = document.getElementById("fisico");
const buttonAudioBook = document.getElementById("audio");
const buttonSearch = document.getElementById("buttonSearch");


// const sendDataGet = () => {
//     console.log('Axios');
//     axios.get(`http://localhost:3002/Buscar_Libro/${document.getElementById("name").value ? document.getElementById("name").value : undefined}/${document.getElementById("level").value ? document.getElementById("level").value : undefined }/${document.getElementById("category").value ? document.getElementById("category").value : undefined}`,{ //Se quitó axios.post
//         // name: document.getElementById("name").value,
//         // level: document.getElementById("level").value,
        
//     }).then(response => {
//         console.log(response);
//     });
// }

const sendDataGet = () => {
    console.log('Axios');
    axios.post(`http://localhost:3002/Buscar_Libro`,{ //Se quitó axios.post
         name: document.getElementById("name").value ? document.getElementById("name").value : 'undefined',
         level: document.getElementById("level").value ? document.getElementById("level").value : 'undefined',
         category: document.getElementById("category").value ? document.getElementById("category").value : 'undefined'
        
    }).then(response => {
        console.log(response);
    });
}

const sendDataPost = () => {
    console.log('Axios');
    axios.post(`http://localhost:3002/agregar_lectura`,{ 
         name: document.getElementById("name").value,
    }).then(response => {
        console.log(response);
    });
}

// const isBook = () => {

//     const isBook = 1;

//     axios.get(`http://localhost:3002/Buscar_Libro/${document.getElementById("name").value ? document.getElementById("name").value : undefined}/${document.getElementById("level").value ? document.getElementById("level").value : undefined }`,{ //Se quitó axios.post
//         // name: document.getElementById("name").value,
//         // level: document.getElementById("level").value,
//     }).then(response => {
//         console.log(response);
//     });
// }


// const isAudio = () => {
    
//     const isBook = 0;

//     axios.get(`http://localhost:3002/Buscar_Libro/${document.getElementById("name").value ? document.getElementById("name").value : undefined}/${document.getElementById("level").value ? document.getElementById("level").value : undefined }`,{ //Se quitó axios.post
//         // name: document.getElementById("name").value,
//         // level: document.getElementById("level").value,
//     }).then(response => {
//         console.log(response);
//     });
// }


buttonSearch.addEventListener('click', sendDataGet);
