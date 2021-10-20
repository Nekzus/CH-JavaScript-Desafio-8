//**** DESCRIPCIÓN DE ENTREGA ****/
//** En este desafio #8 sobre la base del desafio anterior, sume la integracion con el HTML. Se muestra en modo tabla los items ingresados en el localStorage. A su vez agregue 2 botones mas: uno modifica un item */
//** seleccionado por el usuario por el campo que elija, el otro boton es para limpiar los datos almacenados en el localStorage. También como parte de la manipulación del DOM, agregue 3 botones para modificar el formato  */
//** y estilo del texto exibido en la tabla. */

//**** DECLARACION DE VARIABLES GLOBALES ****/
let confirmacion0 = true; // Confirmacion de  duplicación de item ingresado, con fines prácticos permito la duplicación. Inicialización.
let confirmacion1 = true; // Confirmacion de creación de Nuevo Item. Inicialización.
let confirmacion2 = true; // Confirmacion de Borrado Item. Inicialización.
let confirmacion3 = true; // Confirmacion continuar Ordenamiento-Filtrado en modo visualización de una copia del listado de Items. Inicialización.
let idItm = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto.
let itemBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario. Inicialización.
let itemModf = 0; // Variable que almacena el numero de item a modificar ingresado por el usuario. Inicialización.s
let itemGral = 0; // Variable que guarda campo silicitado al usuario para ordenar campos. Inicialización.
let itemFiltrar = 0; // Variable que guarda campo silicitado al usuario para filtrar campos. Inicialización.
let itemGame; // Variable que almacena nuevo objeto/item a ingresar en el array de videoJuegos.
let repeticion = 0; // Subindice de repeticion item. Inicialización.
let videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let printHtml = document.getElementById('printHtml');// Referencia variable al cuadro de productos ingresados en el DOM.
let videoJuego; // Variable para insertar el codigo HTML en la tabla.
let copiaVideoJuegos = [ ...videoJuegos]; // Se realiza una copia del array almacenado, para manipular los datos sin afectar el array original.
let resultado; // Variable para la impresion de los items en el HTML luego de aplicar los filtrados.
const btnIngr = document.querySelector("#btnEjec"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ingreso, y bootstrap.
const btnDelet = document.querySelector("#btnDelet"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrado, y bootstrap.
const btnDeletAll = document.querySelector('#btnDeletAll'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrar todo, y bootstrap.
const btnMins = document.getElementById('btnMins'); // Referencia variable a boton de minuscula en el DOM. 
const btnModf = document.querySelector('#btnModf'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnOrder = document.querySelector("#btnOrder"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ordenamiento - filtrado, y bootstrap.
const btnCurs = document.getElementById('btnCursiva'); // Referencia variable a boton de cursiva en el DOM. 
const btnSubr = document.getElementById('btnSubrayado'); // Referencia variable a boton de subrayadoa en el DOM. 
const textoHtml = document.getElementById('printHtml'); // Referencia variable al texto en el DOM.

//**** FUNCION DE IMPRESIÓN ITEMS EN HTML ****//
const imprimirEnHtml = (item) => {
    printHtml.innerHTML = ""; // Se limpia cuerpo de tabla.
    for(item of item) {
        videoJuego = document.createElement('tr');
        videoJuego.innerHTML = `<th scope="row">${item.idItm}</th>
                                <td>${item.titulo}</td>
                                <td>${item.plataforma}</td>
                                <td>${item.genero}</td>
                                <td>${item.anio}</td>
                                <td>$${item.precio}</td>
                                <td>${item.stock} u</td>`;
        printHtml.appendChild(videoJuego);
    }
}

imprimirEnHtml(videoJuegos); // Se imprime en el cuerpo de la tabla HTML los datos guardados en el localStorage.

//**** FUNCIONES DE FILTRADO DATOS ITEMS ****//
const filtroPorIdtm = (idItm) => videoJuegos.filter(videoJuego => videoJuego.idItm === idItm);  // Filtrado sobre objetos del array videoJuegos por el campo identificador del item.
const filtroPorTitulo = (titulo )=> videoJuegos.filter(videoJuego => videoJuego.titulo === titulo); // Filtrado sobre objetos del array videoJuegos por el campo titulo del item.
const filtroPorPlataforma = (plataforma )=> videoJuegos.filter(videoJuego => videoJuego.plataforma === plataforma); // Filtrado sobre objetos del array videoJuegos por el campo plataforma del item.
const filtroPorGenero = (genero )=> videoJuegos.filter(videoJuego => videoJuego.genero === genero); // Filtrado sobre objetos del array videoJuegos por el campo genero del item.
const filtroPorAnio = (anio )=> videoJuegos.filter(videoJuego => videoJuego.anio === anio); // Filtrado sobre objetos del array videoJuegos por el campo año del item.

//*** FUNCION DE BUSQUEDA POR IDENTIFICADOR ITEM ****//
const busquedaPorIdtm = (idItm) => videoJuegos.find(videoJuego => videoJuego.idItm === idItm); // Se verifica la existencia del item dentro del array videoJuegos almacenado.

//**** FUNCIÓN DE SOLICITUD DE INGRESO DE DATOS ****/
const ingresarDatos = () => {
    let titulo = prompt("Ingrese nombre videojuego.", "MORTAL KOMBAT 4"); // Se solicita nombre videojuego, se carga un valor por defecto para facilitar la revisión del desafio.
    if(titulo === null)  { return {} // En caso de cancelar el ingreso se retorna funcion.
    } else {
     titulo = titulo.toUpperCase()}; // Caso contrario continua ingreso de titulo.

    let plataforma = prompt("Ingrese plataforma videojuego. [PC]-[XBOX]-[PS]...", "PC"); // Se solicita la plataforma, se carga un valor por defecto para facilitar la revisión del desafio.
    if(plataforma === null)  { return {} // En caso de cancelar el ingreso se retorna funcion.
    } else {
     plataforma = plataforma.toUpperCase()}; // Caso contrario continua ingreso de plataforma.
    
    const repeticionTitulo = filtroPorTitulo(titulo); // Se filtra en array con el titulo ingresado, se guarda nuevo array en repeticionTitulo.
    const repeticionPlataforma = repeticionTitulo.filter(arrayTitulo => arrayTitulo.plataforma === plataforma); // Se filtra en nuevo array con la plataforma ingresada, se guarda nuevo array en repeticionPlataforma.
    
    if(repeticionPlataforma.length > 0) { // Si se verifica igualdad de titulo y plataforma en el array almacenado, el item ya fue ingresado.
        confirmacion0 = confirm(`El videojuego ${titulo} para la plataforma ${plataforma}, ya fue ingresado.\nEsta seguro de volver a ingresarlo?`); // Confirmacion de  duplicación de item ingresado, con fines prácticos permito la duplicación.
        if(confirmacion0 !== true) { // Si se cancela confirmación, retorna función.
            return {};  
        }
    }

    let genero = prompt("Ingrese genero videojuego. [ACCION]-[AVENTURA]-[FPS]...", "ACCION"); // Se solicita genero, se carga un valor por defecto para facilitar la revisión del desafio.
    if(genero === null)  { return {} // En caso de cancelar el ingreso se retorna funcion.
    } else {
     genero = genero.toUpperCase()}; // Caso contrario continua ingreso de genero.

    let anio = parseInt(prompt("Ingrese año videojuego. [1997]-[2001]-[2019]...", 1997)); // Se solicita año, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(anio)) { return {} }; // En caso de cancelar el ingreso se retorna funcion.
    
    let precio = parseFloat(prompt("Ingrese precio videojuego.", 1000)); // Se solicita precio, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(precio)) { return {}  // En caso de cancelar el ingreso se retorna funcion.
    } else {
        precio = precio.toFixed(2)}; // Caso contrario continua ingreso de precio.
    
    let stock = parseInt(prompt("Ingrese stock videojuego.", 120)); // Se solicita stock, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(stock)) { return {} }; // En caso de cancelar el ingreso se retorna funcion.
    
    repeticion = repeticionPlataforma.length + 1; // Contabilizo la cantidad de repeticiones de un item (aplicable al contador de productos de un carrito, al repetir producto). 
    let itemDuplicado // Creo una variable para guardar como propiedad de los objetos en el array almacenable, el cual indicara si el item es duplicado.
    repeticion >= 2 ? itemDuplicado = true : itemDuplicado= false;

    return { titulo, plataforma, genero, anio, precio, stock, itemDuplicado }; // Retorna mediante un objeto literal los datos ingresados.
};

//**** OBJECT CONSTRUCTOR ****/
class VideoJuego {
    constructor(idItm, titulo, plataforma, genero, anio, precio, stock, itemDuplicado) { // Recibe los datos ingresados por prompts.
        this.idItm = idItm;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.genero = genero;
        this.anio = anio;
        this.precio = precio;
        this.stock = stock;
        this.duplicado = itemDuplicado;
    }
    printConsole() { // Método impresion en consola de las propiedades y datos de los objetos.
        console.log(
            `%cITEM #${this.idItm} - veces ingresado(${repeticion})`,
            "color: black; font-weight: bold; background:#e17b2a;"); // Se aplica un poco de estilo al encabezado en consola.
        console.log(
            `TÍTULO: ${this.titulo}\nPLATAFORMA: ${this.plataforma}\nGENERO: ${this.genero}\nAÑO: ${this.anio}\nPRECIO: ${this.precio}\nSTOCK: ${this.stock}\n----------------------------\n`
        );
    }
}


btnIngr.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML.

    //**** MODO MODIFICACIÓN: INGRESO DE ITEMS ****//
    do { // Mediante el do.. while se solicita al menos la creación de un objeto, y se pregunta al usuario si desea continuar con la ejecución.
        const { titulo, plataforma, genero, anio, precio, stock, itemDuplicado } = ingresarDatos(); // Se realiza la desestructuración del objeto literal recibido de la funcion ingresarDatos.
        if (titulo === undefined) { // Ante posible cancelación ingreso de titulo, se verifica si se recibe undefined.     
            break; // Se sale.
        } else {// Caso contrario:
            if(videoJuegos.length > 0) { // Se verifica que el array almacenado no este vacio.
                let ultimoObjeto = [...videoJuegos].pop(); // Se crea copia de array almacenado para extraer ultimo objeto-item.
                idItm = ultimoObjeto.idItm; // Se obtiene el identificador del ultimo item almacenado.
            } else { idItm = 0;} // caso contrario se inicializa con 0 el identificador del nuevo item a ingresar.
            
            idItm++ // ... se incrementa el identificador del item (declarado en forma global), y se envia junto con los demas datos al constructor.
            itemGame = new VideoJuego(
                idItm,
                titulo,
                plataforma,
                genero,
                anio,
                precio,
                stock,
                itemDuplicado
            ); // Nuevo objeto creado.
            videoJuegos.push(itemGame);
            localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos)); // Se almacena en el localStorage el nuevo objeto-item creado.
            itemGame.printConsole(); // Se llama el método para la impresion en consola del ojeto.
            location.reload(); // Se refresca el navegador para que se muestren los cambios.
        }

        confirmacion1 = confirm("Desea ingresar un nuevo item?"); // Confirmacion de creación de Nuevo Item.
    } while (confirmacion1); 
    console.log( // En caso de cancelar confirmación de Nuevo Item se imprime en consola el listado de los items almacenados.
        "%cLISTADO DE ITEMS INGRESADOS",
        "color: white; font-size: 16px; font-weight: bold; background: blue;"
    );
    console.table(videoJuegos); // Se muestra listado (array) en consola con los items en modo tabla.
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

btnModf.addEventListener("click", () => { // Llamado modificación de item mediante click del boton en el HTML.

    //**** MODO MODIFICACIÓN: MODIFICACIÓN DE ITEM SELECCIONADO POR EL USUARIO ****/
    if(videoJuegos.length > 0) { // Se verifica que hayan items almacenados.
        do {
            itemModf = parseInt(prompt("Ingrese el número de item a mofificar")); // Se solicita al usuario el numero de item a modificar.
            if (isNaN(itemModf)) { // En caso de cancelacion de la modificación, se sale del do... while.
                confirmacion2 = false;
            } else if (busquedaPorIdtm(itemModf) !== undefined) { // Si se comprueba la existencia del item a modificar, se procede con la modificación.
                confirmacion2 = confirm(`Desea modificar el item #${itemModf} del listado?`); // Se confirma si en verdad se desea modificar el item.
                videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')); // Se lee el array almacenado en el localStorage.
                itemGral = parseInt(prompt(`Campo a Modificar Item #${itemModf}\n[1]-Titulo\n[2]-Plataforma\n[3]-Genero\n[4]-Año\n[5]-Precio\n[6]-Stock`)); // Se solicita al usuario elija el campo a modificar sobre el item seleccionado.
                if(isNaN(itemGral)) { // Si se cancela ingreso.
                confirmacion2 = false;// Se sale del do... while.
                break;
                }
                switch (itemGral) {
                    case 1:        // Se elige modificar Titulo.
                        itemGral = prompt(`Item #${itemModf}\nIngresar nuevo Titulo`).toUpperCase();
                        videoJuegos.map((dato) => {  // Se modifica titulo con nuevo valor.
                            if(dato.idItm === itemModf) {
                                dato.titulo = itemGral;
                            } return dato;
                        });
                        break;
                    case 2:       // Se elige modificar Plataforma.
                        itemGral = prompt(`Item #${itemModf}\nIngresar nueva Plataforma`).toUpperCase();
                        videoJuegos.map((dato) => {  // Se modifica plataforma con nuevo valor.
                            if(dato.idItm === itemModf) {
                                dato.plataforma = itemGral;
                            } return dato;
                            });
                            break;
                    case 3:        // Se elige modificar Genero.
                        itemGral = prompt(`Item #${itemModf}\nIngresar nuevo Genero`).toUpperCase();
                        videoJuegos.map((dato) => {  // Se modifica genero con nuevo valor.
                            if(dato.idItm === itemModf) {
                                dato.genero = itemGral;
                            } return dato;
                            });
                            break;
                    case 4:        // Se elige modificar Año.
                        itemGral = parseInt(prompt(`Item #${itemModf}\nIngresar nuevo Año`));
                        videoJuegos.map((dato) => {  // Se modifica año con nuevo valor.
                            if(dato.idItm === itemModf) {
                                dato.anio = itemGral;
                            } return dato;
                            });
                            break;
                    case 5:        // Se elige modificar Precio.
                        itemGral = parseFloat(prompt(`Item #${itemModf}\nIngresar nuevo Precio`)).toFixed(2);
                        videoJuegos.map((dato) => {   // Se modifica precio con nuevo valor.
                            if(dato.idItm === itemModf) {
                                dato.precio = itemGral;
                            } return dato;
                            });
                            break;
                    case 6:        // Se elige modificar Stock.
                        itemGral = parseInt(prompt(`Item #${itemModf}\nIngresar nuevo Stock`));
                        videoJuegos.map((dato) => {   // Se modifica stock con nuevo valor.
                            if(dato.idItm === itemModf) {
                                dato.stock = itemGral;
                            } return dato;
                            });
                            break;
                    default:
                        alert("Operador Invalido"); // Alerta en caso de ingresar una selección no valida.
                            break;
                }
                localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos)); // Se almacena el array con el item modificado.
                console.table( // Se imprime en consola el array actualizado con el item modificado.
                    "%cLISTADO DE ITEMS INGRESADOS",
                    "color: white; font-size: 16px; font-weight: bold; background: blue;"
                );
                console.table(videoJuegos); // Se muestra nuevo listado (array) en consola sin los items eliminados, en modo tabla.
                location.reload(); // Se refresca el navegador para que se muestren los cambios.

            } else {
                alert(`El item #${itemModf} no existe en el listado`); // Si el item a modificar no existe, se avisa de la inexistencia del item dentro del listado en el array.
            }
    
        } while (confirmacion2); // Espera confirmacion de cancelacion de modificación.

    }}); // Cierre alcance ejecución boton de modificación de item en el HTML.

btnDelet.addEventListener("click", () => { // Llamado borrado de items mediante click del boton en el HTML.

    //**** MODO MODIFICACIÓN: BORRADO DE ITEMS SELECCIONADOS POR EL USUARIO ****/
    if(videoJuegos.length > 0) {
        do {
            itemBorrar = parseInt(prompt("Ingrese el número de item a borrar")); // Se solicita al usuario el numero de item a borrar.
            if (isNaN(itemBorrar)) { // En caso de cancelacion del borrado, se sale del do... while.
                confirmacion2 = false;
            } else if (busquedaPorIdtm(itemBorrar) !== undefined) { // Si se comprueba la existencia del item a borrar, se procede con el borrado. 
                confirmacion2 = confirm(`Desea quitar item #${itemBorrar} del listado?`); // Se confirma si en verdad se desea borrar el item.
                videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')); // Se lee el array almacenado en el localStorage.
                let indexItemBorrar = videoJuegos.findIndex(videoJuego => videoJuego.idItm === itemBorrar); // Se obtiene el numero de posicion en el array del item a borrar.
                videoJuegos.splice(indexItemBorrar, 1); // Se ejecuta el borrado.
                localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos)); // Se almacena el array con el item borrado.
                console.table( // Se imprime en consola el array actualizado con los items eliminados.
                    "%cLISTADO DE ITEMS INGRESADOS",
                    "color: white; font-size: 16px; font-weight: bold; background: blue;"
                );
                console.table(videoJuegos); // Se muestra nuevo listado (array) en consola sin los items eliminados, en modo tabla.
                location.reload(); 

            } else {
                alert(`El item #${itemBorrar} no existe en el listado`); // si el item a borrar no existe, se avisa de la inexistencia del item dentro del listado en el array.
            }
    
        } while (confirmacion2); // Espera confirmacion de cancelacion del borrado.
    }
}); // Cierre alcance ejecución boton de ejecucion en el HTML.

btnDeletAll.addEventListener("click", () => { // Llamado borrado de todos los items mediante click del boton en el HTML.
    //**** MODO MODIFICACIÓN: BORRADO DE TODOS LOS ITEMS ****/
    if(videoJuegos.length >0) {
    confirmacion2 = confirm('Desea quitar todos los items del listado?');
        if(confirmacion2) {
            localStorage.clear();
            location.reload();
        }
    }
    
}); // Cierre alcance ejecución boton de borrado de todos los items en el HTML.

btnOrder.addEventListener("click", () => { // Llamado ordenamiento de items mediante click del boton en el HTML.
    
    //**** MODO VISUALIZACIÓN: ORDENAR Y FILTRAR ITEMS SEGÚN SELECCIÓN DEL USUARIO ****/
    do{
        
        itemGral = parseInt(prompt("Desea\n[1]-Ordenar por Campo\n[2]-Filtrar por Campo")); // Se solicita al usuario seleccione ordenar o filtar campos.
        if(isNaN(itemGral)) { // Si se cancela ingreso.
                confirmacion3 = false // Se sale del do... while.
                break;
        };
        switch (itemGral) {
            case 1:     // Se elige Ordenar por Campo
                itemGral = parseInt(prompt("Elegir Campo a Ordenar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año\n[6]-Precio\n[7]-Stock")); // Se solicita al usuario el campo a ordenar.
                switch (itemGral){
                    case 1:     // Se elige Item#.
                        itemGral = parseInt(prompt("Ordenar Campo Item#\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.idItm - b.idItm); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.idItm - a.idItm); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola. 
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 2:      // Se elige Titulo.
                        itemGral = parseInt(prompt("Ordenar Campo Titulo\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => (a.titulo).localeCompare(b.titulo)); // Aplico método sort. 
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => (b.titulo).localeCompare(a.titulo)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 3:      // Se elige Plataforma.
                        itemGral = parseInt(prompt("Ordenar Campo Plataforma\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => (a.plataforma).localeCompare(b.plataforma)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => (b.plataforma).localeCompare(a.plataforma)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 4:      // Se elige Genero.
                        itemGral = parseInt(prompt("Ordenar Campo Genero\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => (a.genero).localeCompare(b.genero)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => (b.genero).localeCompare(a.genero)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 5:      // Se elige Año.
                        itemGral = parseInt(prompt("Ordenar Campo Año\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.anio - b.anio); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.anio - a.anio); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido"); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 6:       // Se elige Precio.
                        itemGral = parseInt(prompt("Ordenar Campo Precio\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.precio - b.precio); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.precio - a.precio); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido"); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 7:       // Se elige Stock.
                        itemGral = parseInt(prompt("Ordenar Campo Stock\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemGral === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.stock - b.stock); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemGral === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.stock - a.stock); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido"); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    default:
                            alert("Operador Invalido"); // Alerta en caso de ingresar una selección no valida.
                            break;    
                    }
                    imprimirEnHtml(copiaVideoJuegos);
                    break;
            case 2:     // Se elige Filtrar por Campo
                itemFiltrar = parseInt(prompt("Elegir Campo a Filtrar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año")); // Se solicita al usuario el campo a filtrar.
                switch (itemFiltrar){
                    case 1:       // Se elige Item#.
                        itemFiltrar = parseInt(prompt("Ingresar Item#")); // Se solicita a usuario ingrese número de identificador.
                        resultado = filtroPorIdtm(itemFiltrar)
                        console.table(resultado); // Se ejecuta la funcion filtrar por identificador de item.
                        ;
                        break;
                    case 2:       // Se elige Titulo.
                        itemFiltrar = prompt("Ingresar Titulo").toUpperCase(); // Se solicita a usuario ingrese titulo.
                        resultado = filtroPorTitulo(itemFiltrar)
                        console.table(resultado); // Se ejecuta la funcion filtrar por titulo.
                        break;
                    case 3:       // Se elige Plataforma.
                        itemFiltrar = prompt("Ingresar Plataforma [PC]-[XBOX]-[PS]...").toUpperCase(); // Se solicita a usuario ingrese plataforma.
                        resultado = filtroPorPlataforma(itemFiltrar)
                        console.table(resultado); // Se ejecuta la funcion filtrar por plataforma.
                        break;
                    case 4:       // Se elige Genero
                        itemFiltrar = prompt("Ingresar Genero [ACCION]-[AVENTURA]-[FPS]...").toUpperCase(); // Se solicita a usuario ingrese genero.
                        resultado = filtroPorGenero(itemFiltrar)
                        console.table(resultado); // Se ejecuta la funcion filtrar por genero.
                        break;
                    case 5:       // Se elige Año.
                        itemFiltrar = parseInt(prompt("Ingresar Año [1997]-[2001]-[2019]...")); // Se solicita a usuario ingrese año.
                        resultado = filtroPorAnio(itemFiltrar)
                        console.table(resultado); // Se ejecuta la funcion filtrar por año.
                        break;
                    default:
                        alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        break;    
                }
                    imprimirEnHtml(resultado)
                    break;
            default:
                alert("Operador Invalido"); // Alerta en caso de ingresar una selección no valida.
                break;
        }
        
        confirmacion3 = confirm("Desea continuar?"); // Confirmacion continuar Ordenamiento-Filtrado en modo visualización.
        
    } while(confirmacion3); // Espera confirmacion de cancelacion del modo visualización.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.


//**** CAMBIO FORMATO Y ESTILO TEXTO HTML ****//

btnMins.addEventListener('click', () => { // Al presionar el boton de minuscula.
    textoHtml.classList.toggle('lowercase');    // Se agrega o se quita al texto la clase lowercase con el estilo declarado en el archivo CSS.
});

btnCurs.addEventListener('click', () => { // Al presionar el boton de cursiva.
    textoHtml.classList.toggle('italics');     // Se agrega o se quita al texto la clase italics con el estilo declarado en el archivo CSS.
});

btnSubr.addEventListener('click', () => { // Al presionar el boton de subrayado.
    textoHtml.classList.toggle('underline');     // Se agrega o se quita al texto la clase underline con el estilo declarado en el archivo CSS.
});



