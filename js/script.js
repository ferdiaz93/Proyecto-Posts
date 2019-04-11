var divContenedorBotonesUsuario = document.getElementById('div-contenedor-botones-usuario');
var divContenedorListaPosts = document.getElementById('div-contenedor-lista-posts');

pedirDatos(agregarBotones);


function pedirDatos(cbRequest) {
	var request = new XMLHttpRequest();

	request.onload = function() {
		var datosCambiados = JSON.parse(request.responseText);

		cbRequest(datosCambiados);
		//        cbRequest(JSON.parse(request.responseText))
	};

	request.open('GET', 'https://jsonplaceholder.typicode.com/users');
	request.send();
}

//Funcion que agrega un boton por cada elemento que se encuentre en mi array listaUsuarios
function agregarBotones(datos) {
	var listaUsuarios = datos;

	for (var i = 0; i < listaUsuarios.length; i++) {
		crearBotones(listaUsuarios[i].name, listaUsuarios[i].id);
	}
}

//funcion que crea los botones con su respectivo class y evento
function crearBotones(nombre, id) {
	var boton = document.createElement('button');

	boton.setAttribute('class', 'boton-usuario');
	var texto = document.createTextNode(nombre);
	boton.appendChild(texto);

	boton.addEventListener('click', mostrarPost);

	function mostrarPost() {
		verPostsUsuario(id);
	}

	divContenedorBotonesUsuario.appendChild(boton);
}

//funcion que pide los datos de los posts
function pedirDatosListaPostUsuarios(idUsuario, callbackConsultarPostOK){
	var requestLista = new XMLHttpRequest();
  
	requestLista.onload = function () {
	  
	  var postUsuario = JSON.parse(requestLista.responseText);
	  console.log("este es mi postUsuario", postUsuario);
  
	  var respuesta = [];
  
	  postUsuario.map(post => {
			if (post.userId === idUsuario) {
			  respuesta.push(post);
			}	
	  	});
	  callbackConsultarPostOK(respuesta);
	}
  
	requestLista.open("GET", "https://jsonplaceholder.typicode.com/posts?UserId=" + idUsuario)
	requestLista.send()
  

}


function verPostsUsuario(idUsuario) {
	// Se vacía el div de posts por si hay elementos previos.
	divContenedorListaPosts.innerHTML = "";
  
	// Se crea variable para guardar el array de posts, se llena con la función de consulta
	pedirDatosListaPostUsuarios(idUsuario, function callback(datos) {
	  // Se recorre el array de posts y para cada uno se crea el elemento en pantalla
	  for (var i = 0; i < datos.length; i++) {
		
		var nuevoDiv = document.createElement("div");
		nuevoDiv.setAttribute("class", "post");
		var textDiv = document.createTextNode(JSON.stringify(datos[i].title));
		nuevoDiv.append(textDiv);

		nuevoDiv.addEventListener("click", function(){
			console.log("llegue aca")
		})
		divContenedorListaPosts.appendChild(nuevoDiv);
	  }
	})
  }
  