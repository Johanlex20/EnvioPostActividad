//
const distancia = {
    'Bogotá': [{ destino: 'Bogotá', km: 50 },{ destino: 'Medellin', km: 410 }, { destino: 'Cali', km: 210 }, { destino: 'Villavicencio', km: 122 }, { destino: 'Barranquilla', km: 539 }],
    'Medellin': [{ destino: 'Medellin', km: 50 },{ destino:'Bogotá', km: 410 }, { destino: 'Cali', km: 110 }, { destino: 'Villavicencio', km: 222 }, { destino: 'Barranquilla', km: 300 }],
    'Cali': [{ destino: 'Cali', km: 50 },{ destino: 'Medellin', km: 210 }, { destino: 'Bogotá', km: 500 }, { destino: 'Villavicencio', km: 150 }, { destino: 'Barranquilla', km: 200 }],
    'Barranquilla': [{ destino: 'Barranquilla', km: 50 },{ destino: 'Medellin', km: 310 }, { destino: 'Cali', km: 150 }, { destino: 'Villavicencio', km: 380 }, { destino: 'Bogotá', km: 550 }],
    'Villavicencio': [{ destino: 'Villavicencio', km: 50 },{ destino: 'Medellin', km: 222 }, { destino: 'Cali', km: 150 }, { destino: 'Bogotá', km: 120 }, { destino: 'Barranquilla', km: 380 }]

};
// Clase Envio
class Envio {

    constructor(idEnvio, usuario,origen, destino, prioridad, tipo,peso,costoTotal) {
        this.idEnvio = idEnvio;   // Identificación única del envío
        this.usuario = usuario;
        this.origen = origen;  // Ciudad de origen
        this.destino = destino; //ciudad de destino
        this.prioridad = prioridad;  // Prioridad del envío (1 = más urgente)
        this.tipo = tipo; // Tipo de envío (paquete, carta, sobre, bolsa, etc.)
        this.izquierda = null;
        this.derecha = null;
        this.distancia = 0;  // distancia del envío (se calculará en base a la distancia)
        this.peso = peso; // Peso del envío
        this.costoTotal = costoTotal;  // Costo total del envío (se calculará en base a la distancia y el peso)
    }
}
function calcularValorTotal(origen, destino,peso,tipo) {
    switch (origen) {
        case 'Bogotá':
            return calcularValor(distancia[origen].find(dist => dist.destino === destino).km,peso,tipo);
        case 'Medellin':
            return calcularValor(distancia[origen].find(dist => dist.destino === destino).km,peso,tipo);
        case 'Barranquilla':
            return calcularValor(distancia[origen].find(dist => dist.destino === destino).km,peso,tipo);
        case 'Villavicencio':
            return calcularValor(distancia[origen].find(dist => dist.destino === destino).km,peso,tipo);
        case 'Cali':
            return calcularValor(distancia[origen].find(dist => dist.destino === destino).km,peso,tipo);
        default:
            return 0;
    }
         
    }
    function calcularValor(km,peso,tipo){
        return km*peso*valorKgPorTipo(tipo);
    }

    function valorKgPorTipo(tipo){
        switch (tipo) {
            case 'caja':
                return 10;
            case 'farmacos':
                return 5;
            case 'alimentos':
                return 2;
            case 'envases':
                return 3;
            case 'electronicos':
                return 15;
            default:
                return 0;
        }
    }

// Clasificación de envíos
class ClasficacionEnvios {
    constructor() {
        this.raiz = null;  // Iniciar sin envíos
    }
    // Método para agregar un envío
    agregarEnvio(idEnvio, usuario, origen, destino, prioridad, tipo ,peso,costoTotal) {
        const nuevoEnvio = new Envio(idEnvio, usuario,origen, destino, parseInt(prioridad), tipo, parseFloat(peso),parseFloat(costoTotal));
        console.log("El costo total del envío es: " + costoTotal +"  peso:  "+peso +"   tipo: "+tipo +"   origen: "+origen +"  destino: "+destino);
        //idEnvio, usuario,origen, destino, prioridad, tipo,peso
        if (!this.raiz) {
            this.raiz = nuevoEnvio;  // Si el árbol está vacío, el primer envío es la raíz
        } else {
            this.insertarEnvio(this.raiz, nuevoEnvio);
        }
    }

    // Método recursivo para insertar un envío según la prioridad
    insertarEnvio(envio, nuevoEnvio) {
        if (nuevoEnvio.prioridad < envio.prioridad) {
            if (!envio.izquierda) {
                envio.izquierda = nuevoEnvio;  // Inserta a la izquierda (prioridad menor)
            } else {
                this.insertarEnvio(envio.izquierda, nuevoEnvio);
            }
        } else {
            if (!envio.derecha) {
                envio.derecha = nuevoEnvio;  // Inserta a la derecha (prioridad mayor)
            } else {
                this.insertarEnvio(envio.derecha, nuevoEnvio);
            }
        }
    }

    // Método para mostrar los envíos en orden de prioridad
    mostrarEnvios(envio = this.raiz, containerHtml) {
        if (envio !== null) {
            this.mostrarEnvios(envio.izquierda, containerHtml);  // Recorrer el subárbol izquierdo (prioridad menor)
    
            // Crear la tarjeta visual de envío
            const envioCard = document.createElement('div');
            envioCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'border', 'border-gray-200');
            envioCard.innerHTML = `
            <h3 class="text-lg font-bold mb-2">ID Envío: ${envio.idEnvio}</h3>
            <p><strong>Usuario:</strong> ${envio.usuario}</p>
            <p><strong>Origen:</strong> ${envio.origen}</p>
            <p><strong>Destino:</strong> ${envio.destino}</p>
            <p><strong>Peso:</strong> ${envio.peso} kg</p>
            <p><strong>Prioridad:</strong> ${envio.prioridad}</p>
            <p><strong>Tipo:</strong> ${envio.tipo}</p>
            <p><strong>Costo: $ </strong> ${envio.costoTotal}</p>
        `;

            containerHtml.appendChild(envioCard);

            this.mostrarEnvios(envio.derecha, containerHtml);
        }
    }


    // Método para filtrar envíos por ciudad
    filtrarEnvios(ciudad, envio = this.raiz, result = []) {
        if (envio !== null) {
            this.filtrarEnvios(ciudad, envio.izquierda, result);  // Filtrar el subárbol izquierdo

            if (envio.destino === ciudad) {
                result.push(envio);  // Agregar al resultado si coincide con la ciudad
            }

            this.filtrarEnvios(ciudad, envio.derecha, result);  // Filtrar el subárbol derecho
        }
        return result;
    }

}



// Creación de la empresa de envíos
const enviosPostales = new ClasficacionEnvios();

// Capturar el formulario y agregar el envío
document.getElementById('formEnvio').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const idEnvio = document.getElementById('idEnvio').value;
    const usuario = document.getElementById('usuario').value;
    const origen = document.getElementById('origen').value;
    const peso = document.getElementById('peso').value;
    const destino = document.getElementById('destino').value;
    const prioridad = document.getElementById('prioridad').value;
    const tipo = document.getElementById('tipo').value;

    //idEnvio, usuario, origen, destino, prioridad, tipo ,peso
    // Agregar el envío al árbol
    
    enviosPostales.agregarEnvio(idEnvio, usuario,origen, destino, prioridad, tipo ,peso,calcularValorTotal(origen, destino,peso,tipo));

    // Limpiar el formulario después de agregar el envío
    document.getElementById('formEnvio').reset();

});

// Mostrar lista de envíos cuando se hace clic en el botón
document.getElementById('mostrarEnviosBtn').addEventListener('click', function () {
    const enviosContainer = document.getElementById('enviosContainer');
    enviosContainer.innerHTML = '';
    enviosPostales.mostrarEnvios(enviosPostales.raiz, enviosContainer);
});



// Mostrar/ocultar el filtro de ciudad cuando se presiona el botón "Filtrar envíos"
document.getElementById('mostrarFiltroBtn').addEventListener('click', function () {
    const filtroCiudadContainer = document.getElementById('filtroCiudadContainer');
    filtroCiudadContainer.classList.toggle('hidden');  // Mostrar/ocultar el filtro de ciudad
});

// Aplicar filtro de ciudad
document.getElementById('aplicarFiltroBtn').addEventListener('click', function () {
    const ciudadSeleccionada = document.getElementById('ciudadFiltro').value;
    const enviosContainer = document.getElementById('enviosContainer');
    enviosContainer.innerHTML = '';  // Limpiar contenedor

    if (ciudadSeleccionada) {
        // Filtrar los envíos por la ciudad seleccionada
        const enviosEncontrados = enviosPostales.filtrarEnvios(ciudadSeleccionada);
        console.log(enviosEncontrados);
        console.log(ciudadSeleccionada);
        console.log(enviosEncontrados.length);

        // Mostrar los resultados filtrados
        if (enviosEncontrados.length > 0) {
            enviosEncontrados.forEach(envio => {
                const envioCard = document.createElement('div');
                envioCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'border', 'border-gray-200');
                envioCard.innerHTML = `
                    <h3 class="text-lg font-bold mb-2">ID Envío: ${envio.idEnvio}</h3>
                    <p><strong>Usuario:</strong> ${envio.usuario}</p>
                    <p><strong>Origen:</strong> ${envio.origen}</p>
                    <p><strong>Prioridad:</strong> ${envio.prioridad}</p>
                    <p><strong>Tipo:</strong> ${envio.tipo}</p>
                `;
                enviosContainer.appendChild(envioCard);
            });
        } else {
            const mensajeNoResultados = document.createElement('p');
            mensajeNoResultados.textContent = 'No se encontraron envíos para la ciudad seleccionada.';
            mensajeNoResultados.classList.add('text-red-500');
            enviosContainer.appendChild(mensajeNoResultados);
        }

        // Ocultar el filtro una vez se haya aplicado
        document.getElementById('filtroCiudadContainer').classList.add('hidden');
    } else {
        alert('Por favor seleccione una ciudad para aplicar el filtro.');
    }
});
