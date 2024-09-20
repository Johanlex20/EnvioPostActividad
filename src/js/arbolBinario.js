// Nodo del Árbol Binario
class NodoMensaje {
    constructor(mensaje, tiempo) {
      this.mensaje = mensaje;    // El contenido del mensaje
      this.tiempo = tiempo;      // El tiempo de llegada
      this.izquierda = null;     // Hijo izquierdo (mensaje más antiguo)
      this.derecha = null;       // Hijo derecho (mensaje más reciente)
    }
  }
  
  // Árbol Binario
  class ArbolMensajes {
    constructor() {
      this.raiz = null;  // Inicialmente no hay mensajes
    }
  
    // Insertar un mensaje en el árbol
    agregarMensaje(mensaje, tiempo) {
      const nuevoNodo = new NodoMensaje(mensaje, tiempo);
      
      if (!this.raiz) {
        this.raiz = nuevoNodo;  // Si el árbol está vacío, el nuevo nodo es la raíz
      } else {
        this.insertarNodo(this.raiz, nuevoNodo);
      }
    }
  
    // Función recursiva para insertar nodos en el árbol
    insertarNodo(nodo, nuevoNodo) {
      if (nuevoNodo.tiempo < nodo.tiempo) {
        // Si el nuevo nodo es más antiguo, va a la izquierda
        if (!nodo.izquierda) {
          nodo.izquierda = nuevoNodo;
        } else {
          this.insertarNodo(nodo.izquierda, nuevoNodo);
        }
      } else {
        // Si el nuevo nodo es más reciente, va a la derecha
        if (!nodo.derecha) {
          nodo.derecha = nuevoNodo;
        } else {
          this.insertarNodo(nodo.derecha, nuevoNodo);
        }
      }
    }
  
    // Recorrer el árbol para mostrar los mensajes en orden (antiguo a reciente)
    mostrarMensajes(nodo = this.raiz) {
      if (nodo !== null) {
        this.mostrarMensajes(nodo.izquierda);  // Recorrer el subárbol izquierdo (antiguo)
        console.log(`Mensaje: ${nodo.mensaje}, Tiempo: ${nodo.tiempo}`);
        this.mostrarMensajes(nodo.derecha);    // Recorrer el subárbol derecho (reciente)
      }
    }
  }
  
  // Simulación de la aplicación de mensajería
  const appMensajeria = new ArbolMensajes();
  
  // Agregamos algunos mensajes simulados con un timestamp
  appMensajeria.agregarMensaje("Hola, ¿cómo estás?", 3);
  appMensajeria.agregarMensaje("Todo bien, gracias", 1);
  appMensajeria.agregarMensaje("Genial, ¿nos vemos mañana?", 5);
  
  // Mostramos los mensajes ordenados (antiguo a reciente)
  console.log("Mensajes en orden:");
  appMensajeria.mostrarMensajes();
  