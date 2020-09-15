import * as UI from './interfaz.js';

UI.formulariobuscar.addEventListener('submit', buscarcancion);

function buscarcancion(e){
    e.preventDefault();

    const artista=document.querySelector('#artista').value;
    const cancion=document.querySelector('#cancion').value;

    if(artista==='' || cancion===''){
        UI.divmensajes.textContent='Error.... Todos los campos son obligatorios';
        UI.divmensajes.classList.add('error');

        setTimeout(()=>{
            UI.divmensajes.textContent='';
            UI.divmensajes.classList.remove('error');
        }, 3000);
        return;
    }
}