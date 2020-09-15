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

    spinner();

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
    const {name, main: {temp, temp_max, temp_min}}=datos;
    
    const centigrados=kelvincentigrados(temp);
    const max=kelvincentigrados(temp_max);
    const min=kelvincentigrados(temp_min);

    const mostrarciudad=document.createElement('p');
    mostrarciudad.textContent=`Clima en ${name}`;
    mostrarciudad.classList.add('font-bold', 'text-2xl');

    const actual=document.createElement('p');
    actual.innerHTML=`${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempmax=document.createElement('p');
    tempmax.innerHTML=`Max: ${max} &#8451;`;
    tempmax.classList.add('text-xl');

    const tempmin=document.createElement('p');
    tempmin.innerHTML=`Min: ${min} &#8451;`;
    tempmin.classList.add('text-xl');

    const resultadodiv=document.createElement('div');
    resultadodiv.classList.add('text-center', 'text-white');
    resultadodiv.appendChild(mostrarciudad);
    resultadodiv.appendChild(actual);
    resultadodiv.appendChild(tempmax);
    resultadodiv.appendChild(tempmin);

    resultado.appendChild(resultadodiv);
}

const kelvincentigrados=(grados)=>parseInt(grados-273.15);

function limpiar(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner(){

 limpiar();
 const divspinner=document.createElement('div');
 divspinner.classList.add('sk-circle');
 divspinner.innerHTML=`
 
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
 `;
resultado.appendChild(divspinner);
}