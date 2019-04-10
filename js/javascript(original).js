// Se definen variables para guardar referencias a los divs contenedores que ya están creados
var divContenedorBotonesUsuario = document.getElementById(
  "div-contenedor-botones-usuario"
);
var divContenedorListaPosts = document.getElementById(
  "div-contenedor-lista-posts"
);

pedirDatos(agregarBotones);

function pedirDatos(cbResponse) {
  var request = new XMLHttpRequest();
  //console.log('1')

  request.onload = function () {

    cbResponse(JSON.parse(request.responseText));
  }


  // request.onreadystatechange = function() {
  //   if (this.readyState == 4) {
  //     //console.log('2')
  //     if (this.status == 200) {
  //       //  console.log('3');
  //       var arrayUsuarios = JSON.parse(request.responseText);

  //       cbResponse(arrayUsuarios);

  //       // console.log(misDatos);
  //     }
  //   }
  // };

  //console.log('4')
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  //console.log('5')
  request.send();
}

function agregarBotones(datos) {
  var listaUsuarios = datos;

  console.log("mi lista de usuarios", listaUsuarios);
  if (listaUsuarios != undefined) {
    // Se recorre la lista de usuarios
    for (var i = 0; i < listaUsuarios.length; i++) {
      // Para cada uno se agrega un botón en el div contenedor de botones
      crearBotones(listaUsuarios[i].name, listaUsuarios[i].id);
    }
  }
}

function crearBotones(nombre, id) {
  // Se crea el elemento botón
  let boton = document.createElement("button");

  // Se le agrega una clase
  boton.setAttribute("class", "boton-usuario");

  boton.appendChild(document.createTextNode(nombre));

  boton.addEventListener("click", mostrarPost);

  function mostrarPost() {
    verPostsUsuario(id);
  }

  // Agrega el botón creado al div recibido como contenedor
  divContenedorBotonesUsuario.appendChild(boton);
}



function consultarListaPostsUsuario(idUsuario, callbackConsultaPostOK) {
  // Por ahora se devuelven datos de ejemplo, variables según el id consultado

  var requestLista = new XMLHttpRequest();
  //console.log('1')

  requestLista.onload = function () {

    var postUsuario = JSON.parse(requestLista.responseText);
    //callbackConsultaPostOK(postUsuario);
    console.log("este es mi postUsuario", postUsuario);
  }

  requestLista.open("GET", "https://jsonplaceholder.typicode.com/posts?UserId=" + idUsuario);
  //console.log('5')
  requestLista.send();


  var respuesta = [];



  /*

    TODO: generar el código necesario para que según el idUsuario recibido devuelva resultados diferentes.
    En todos los casos, lo que hacemos es agregar objetos (definidos a mano) al array "respuesta"
    que después serán devueltos en la última línea (return respuesta). Cada objeto que agreguemos
    tendrá que tener la siguiente forma (expresado como propiedad: <tipo de dato>)
    {
        id: <number>,
        titulo: <string>,
        contenido: <string>
    }

    Pistas de una forma sencilla de hacerlo: recuerden "switch" y "push"
  */

  // Se muestra por consola para control en las pruebas
  console.log(respuesta);

  return respuesta;
}



function verPostsUsuario(idUsuario) {
  // Se vacía el div de posts por si hay elementos previos.
  // Lo hacemos con innerHTML para no complicarnos ahora, pero no es la forma más apropiada
  divContenedorListaPosts.innerHTML = "";

  // Se crea variable para guardar el array de posts, se llena con la función de consulta
  var listaPosts = consultarListaPostsUsuario(idUsuario);
  console.log("lista post", listaPosts);
  // Se recorre el array de posts y para cada uno se crea el elemento en pantalla
  for (var i = 0; i < listaPosts.length; i++) {
    ///COMO ACCEDO A LA PROPIEDAD TITULO DE UN OBJETO DENTRO DE UN ARRAY??

    var nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "post");
    var textDiv = document.createTextNode(listaPosts[i]);
    nuevoDiv.append(textDiv);
    divContenedorListaPosts.appendChild(nuevoDiv);
  }
}





/*
// Se define array ("global") para la lista de usuarios
var listaUsuarios = [];

// Se consulta lista de usuarios y se guarda en el array
listaUsuarios = consultarListaUsuarios();

// Se controla que exista la lista para recorrerla
if (listaUsuarios != undefined) {
  // Se recorre la lista de usuarios
  for (var i = 0; i < listaUsuarios.length; i++) {
    // Para cada uno se agrega un botón en el div contenedor de botones
    agregarBoton(listaUsuarios[i].nombre, listaUsuarios[i].id);
  }
} else {
  // Si no hay lista, se tira mensaje por consola para pruebas
  console.log("No hay usuarios definidos");
}


/**
 * Agrega un botón para acceder a los posts del usuario indicado
 *
 * @param nombre           Nombre del usuario (string)
 * @param id               id del usuario (number)
 *

function agregarBoton(nombre, id) {
  // Se crea el elemento botón
  let boton = document.createElement("button");

  // Se le agrega una clase
  boton.setAttribute("class", "boton-usuario");



  // Se le asigna el texto
  boton.appendChild(document.createTextNode(nombre));

  // Se le asigna una función al evento click.
  boton.addEventListener("click", mostrarPost);

  function mostrarPost() {
    verPostsUsuario(id);
  }



  // Agrega el botón creado al div recibido como contenedor
  divContenedorBotonesUsuario.appendChild(boton);
}

/**
 * Consulta y muestra los posts creados por el usuario indicado
 *
 * @param idUsuario        id del usuario (number)
 *

function verPostsUsuario(idUsuario) {
  // Se vacía el div de posts por si hay elementos previos.
  // Lo hacemos con innerHTML para no complicarnos ahora, pero no es la forma más apropiada
  divContenedorListaPosts.innerHTML = "";

  // Se crea variable para guardar el array de posts, se llena con la función de consulta
  var listaPosts = consultarListaPostsUsuario(idUsuario);

  // Se recorre el array de posts y para cada uno se crea el elemento en pantalla
  for (var i = 0; i < listaPosts.length; i++) {
    ///COMO ACCEDO A LA PROPIEDAD TITULO DE UN OBJETO DENTRO DE UN ARRAY??

    var nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "post");
    var textDiv = document.createTextNode(listaPosts[i]);
    nuevoDiv.append(textDiv);
    divContenedorListaPosts.appendChild(nuevoDiv);

  }
}

/**
 * Consulta y devuelve la lista de posts para un usuario
 *
 * @param idUsuario: id del usuario a consultar
 *
 * @return: Array de posts para el usuario, en objetos {id, titulo, contenido}
 *

function consultarListaPostsUsuario(idUsuario) {
  // Por ahora se devuelven datos de ejemplo, variables según el id consultado


  var respuesta = [];



  /*

    TODO: generar el código necesario para que según el idUsuario recibido devuelva resultados diferentes.
    En todos los casos, lo que hacemos es agregar objetos (definidos a mano) al array "respuesta"
    que después serán devueltos en la última línea (return respuesta). Cada objeto que agreguemos
    tendrá que tener la siguiente forma (expresado como propiedad: <tipo de dato>)
    {
        id: <number>,
        titulo: <string>,
        contenido: <string>
    }

    Pistas de una forma sencilla de hacerlo: recuerden "switch" y "push"




// Se muestra por consola para control en las pruebas
console.log(respuesta);

return respuesta;
}

/**
 * Consulta y devuelve la lista de usuarios en un array
 *
 * @return: Array de usuarios. Cada elemento es un objeto {id, nombre}
 *

function consultarListaUsuarios() {
  var miArrayDeUsuarios = [{
      id: 1234,
      nombre: "Karina"
    },
    {
      id: 5678,
      nombre: "Jazmin"
    },
    {
      id: 91011,
      nombre: "Priscila"
    }
  ];

  return miArrayDeUsuarios;

  /*
    TODO: generar el código para que la función cree y devuelva un array de usuarios, esto es un
    array (con datos a mano) de objetos con la estructura:
    {
        id: <number>,
        nombre: <string>
    }

    Pistas: no olviden DEVOLVER el objeto generado

}

*/

///https: //jsonplaceholder.typicode.com/users
