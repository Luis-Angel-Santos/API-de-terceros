const container=document.querySelector('.container');
const resultado=document.querySelector('#resultado');
const formulario=document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarclima);
})

function buscarclima(e){
    e.preventDefault();

    const ciudad=document.querySelector('#ciudad').value;
    const pais=document.querySelector('#pais').value;

    if(ciudad==='' || pais===''){
        mostarError('Ambos campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);
}

function mostarError(mensaje){
    const alerta=document.querySelector('.bg-red-100');

        if(!alerta){
            const alerta=document.createElement('div');

            alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
            alerta.innerHTML=`
                <strong class="font-bold">Error!</strong>
                <span class="block">${mensaje}</span> 
            `;
            container.appendChild(alerta);

            setTimeout(()=>{
                alerta.remove();
            }, 5000);
        }
}

function consultarAPI(ciudad, pais){
     const appid='4bb55e5704aec5380422e644d0b6a577';
     const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;

     fetch(url)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            
            limpiar();

            if(datos.cod==="404"){
                mostarError('Ciudad no encontrada')
                return;
            }
            mostrarclima(datos);
        })
}

function mostrarclima(datos){
    const {main: {temp, tem_max, tem_min}}=datos;
    const centigrados=kelvincentigrados(temp);
    const actual=document.createElement('p');
    actual.innerHTML=`${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadodiv=document.createElement('div');
    resultadodiv.classList.add('text-center', 'text-white');
    resultadodiv.appendChild(actual);

    resultado.appendChild(resultadodiv);
}

const kelvincentigrados=(grados)=>parseInt(grados-273.15);

function limpiar(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}