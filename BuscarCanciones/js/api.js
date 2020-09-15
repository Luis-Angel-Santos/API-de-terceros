import * as UI from './interfaz.js';

class API{
    constructor(artista, cancion){
        this.artista=artista;
        this.cancion=cancion;
    }
    consultarAPI(){
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        fetch(url)
            .then(respuesta=>respuesta.json())
            .then(resultado=>{
                if(resultado.lyrics){
                        const {lyrics}=resultado;
                        UI.divresultado.textContent=lyrics;
                        UI.headingresultado.textContent=`Letra de la cancion de ${this.cancion} de ${this.artista}`
                }else{
                    UI.divmensajes.textContent='La cancion no existe, prueba con otra busqueda';
                    UI.divmensajes.classList.add('error');
                    setTimeout(()=>{
                        UI.divmensajes.textContent='';
                    UI.divmensajes.classList.remove('error');
                    }, 3000);
                }
                    
       })
        }
}

export default API;