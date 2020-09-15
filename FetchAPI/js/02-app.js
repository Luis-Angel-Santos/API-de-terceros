const cargarjson=document.querySelector('#cargarJSON');
cargarjson.addEventListener('click', obtenerdatos);

function obtenerdatos(){
    const url='data/empleado.json';
    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(resultado=>mostrarHTML(resultado))
}

function mostrarHTML({empresa, id, nombre, trabajo}){
    const contenido=document.querySelector('.contenido');

    contenido.innerHTML=`
        <p>Empleado: ${nombre}</p>
        <p>ID: ${id}</p>
        <p>Empresa: ${empresa}</p>
        <p>Empleado: ${trabajo}</p>
        `;
}