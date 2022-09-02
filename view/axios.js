// import axios from 'axios';

const buttonPOST = document.getElementById("button");
// const buttonGet = document.getElementById("buttonGet");

const getData = () => {
    axios.get('http://localhost:3001/denuncias').then(response =>{
        console.log(response);
    })
}

const sendData = () => {
    axios.get(`http://localhost:3002/Buscar_Libro/${document.getElementById("name").value ? document.getElementById("name").value : undefined}/${document.getElementById("level").value ? document.getElementById("level").value : undefined }`,{ //Se quitó axios.post
        // name: document.getElementById("name").value,
        // level: document.getElementById("level").value,
    }).then(response => {
        console.log(response);
    });
}

// buttonGet.addEventListener('click', getData);
buttonPOST.addEventListener('click', sendData);
