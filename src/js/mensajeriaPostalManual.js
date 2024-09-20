// Clase Envio
class Envio {
    constructor(idEnvio, usuario, destino, prioridad, tipo) {
        this.idEnvio = idEnvio;   // Identificación única del envío
        this.usuario = usuario;
        this.destino = destino;
        this.prioridad = prioridad;  // Prioridad del envío (1 = más urgente)
        this.tipo = tipo; // Tipo de envío (paquete, carta, sobre, bolsa, etc.)
        this.izquierda = null;
        this.derecha = null;
    }
}

// Clasificación de envíos
class ClasficacionEnvios {
    constructor() {
        this.raiz = null;  // Iniciar sin envíos
    }

    // Método para agregar un envío
    agregarEnvio(idEnvio, usuario, destino, prioridad, tipo) {
        const nuevoEnvio = new Envio(idEnvio, usuario, destino, prioridad, tipo);

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
    mostrarEnvios(envio = this.raiz) {
        if (envio !== null) {
            this.mostrarEnvios(envio.izquierda);  // Recorrer el subárbol izquierdo (prioridad menor)
            console.log(`ID Envío: ${envio.idEnvio}, Usuario: ${envio.usuario}, Prioridad: ${envio.prioridad}, Destino: ${envio.destino}, Tipo: ${envio.tipo}`);
            this.mostrarEnvios(envio.derecha);    // Recorrer el subárbol derecho (prioridad mayor)
        }
    }
}

// Creación de la empresa de envíos
const enviosPostales = new ClasficacionEnvios();

// Agregar envíos manuales
enviosPostales.agregarEnvio("1", "Marlen", "Cali", 5, "Gafas de sol");
enviosPostales.agregarEnvio("2", "Lukas", "Barranquilla", 4, "Celular");
enviosPostales.agregarEnvio("3", "Nicol", "Medellín", 1, "Medicina");
enviosPostales.agregarEnvio("4", "Gilberto", "Bogotá", 1, "Hamburguesa");
enviosPostales.agregarEnvio("6", "Katherine", "Bucaramanga", 3, "Sobre");

// Imprimir prioridad de envíos
console.log("Envíos ordenados por prioridad:");
enviosPostales.mostrarEnvios();
