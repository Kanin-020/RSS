// Creamos los arreglos que almacenaran las noticias obtenidas
let noticiasArray = new Array();
let noticiasPorFechaArray = new Array();

// funcion para cargar el contenido del RSS
function cargarContenido(urlRSS) {
  // creamos un objeto XMLHttpRequest para obtener informacion de la url
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let contentData = JSON.parse(this.responseText);
      console.log(contentData);
      crearNoticias(contentData);
      noticiasArray = contentData;
      noticiasPorFechaArray = JSON.parse(this.responseText);
    }
  };
  httpRequest.open("GET", urlRSS, true);
  httpRequest.send();
}

// funcion para crear una noticia y desplegarla en el cliente
function crearNoticias(contentData) {
  var contenido = document.getElementById("Content");
  let opcion = "";
  // mostramos el preview de la noticia almacenada
  for (let i = 0; i < contentData.length; i++) {
    opcion += '<div class="News">';
    opcion += "<h3>" + contentData[i].titulo + "</h3>";
    opcion += '<h6> Fecha: " ' + contentData[i].fecha + '"</h6>';
    opcion +=
      "<p>Descripción: " +
      contentData[i].descripcion +
      '<a href="' +
      contentData[i].enlace +
      '">Read More...</a>' +
      "</p>";
    opcion += "<h5>" + contentData[i].cat + "</h5>";
    opcion += "<hr>";
    opcion += "</div>";
  }
  contenido.innerHTML = opcion;
  contenido.style.textAlign = "left";
}

// funcion para buscar noticias obtenidas en la base de datos
function buscarNoticias(datosNoticias, noticiasArray) {
  let resultadoArray = new Array();
  var contenido = document.getElementById("Content");
  for (let i = 0; i < noticiasArray.length; i++) {
    if (noticiasArray[i].titulo.includes(datosNoticias)) {
      resultadoArray.push(noticiasArray[i]);
    }
  }
  if (resultadoArray.length > 0) {
    contenido.style.textAlign = "left";
    crearNoticias(resultadoArray);
  } else {
    contenido.style.fontSize = "25px";
    contenido.style.textAlign = "center";
    contenido.style.marginTop = "5rem";
    contenido.innerHTML = "No se encontraron resultados";
  }
}

// funcion que obtiene una noticia selecionada
function getNoticiaSeleccionada(urlRSS, contentData) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
      if ((this.readyState == 4) && (this.status == 200)) {
          let contentData = JSON.parse(this.responseText);
          console.log(contentData);
          crearNoticias(contentData);
          noticiasArray = contentData;
          noticiasPorFechaArray = JSON.parse(this.responseText);
      }
  };
  httpRequest.open("POST", urlRSS + "?data=" + contentData, true);
  httpRequest.send();
}

function OrdenarPorTitulo() {
	this.sort= function(){
		noticiasArray.sort(function (a,b) {
			if(a.titulo.toLowerCase() > b.titulo.toLowerCase()){
				return 1;
			}
			if(a.titulo.toLowerCase() < b.titulo.toLowerCase()){
				return -1;
			}
			return 0;
		});
		crearNoticias(noticiasArray);
	};
}

function OrdenarPorFecha() {
	this.sort= function(){
		crearNoticias(noticiasPorFechaArray);
	};
}

function OrdenarPorEnlace() {
	this.sort= function(){
		noticiasArray.sort(function (a,b) {
			if(a.enlace.toLowerCase() > b.enlace.toLowerCase()){
				return 1;
			}
			if(a.enlace.toLowerCase() < b.enlace.toLowerCase()){
				return -1;
			}
			return 0;
		});
		crearNoticias(noticiasArray);
	};
}

function OrdenarPorDescripcion() {
	this.sort= function(){
		noticiasArray.sort(function (a,b) {
			if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()){
				return 1;
			}
			if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()){
				return -1;
			}
			return 0;
		});
		crearNoticias(noticiasArray);
	};
}

function OrdenarPorCategorias() {
	this.sort= function(){
		noticiasArray.sort(function (a,b) {
			if(a.cat.toLowerCase() > b.cat.toLowerCase()){
				return 1;
			}
			if(a.cat.toLowerCase() < b.cat.toLowerCase()){
				return -1;
			}
			return 0;
		});
		crearNoticias(noticiasArray);
	};
}

//Animación loader
function activarAnimacionCargar() {
  let loader = document.getElementById("loader");
  loader.style.display = "block";
}

//Animación loader
function desactivarAnimacionCargar() {
  let loader = document.getElementById("loader");
  loader.style.display = "none";
}

function agregarNoticiaAlimentacion() {
  var xhttp = new XMLHttpRequest();
  let insertar = document.getElementById("insert-url");
  let datos = document.getElementById("insert-url").value;
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          cargarSeleccionado(); //Aqui se deberia actualizar el select porque estamos metiendo una nueva url
          cargarContenido("./php/ObtenerAlimentacion.php");//Aqui deberia actualizar la vista despues de meter una nueva url
      }
  };
  xhttp.open("POST", "./php/AgregarAlimentacion? url=" + datos, true);
  xhttp.send();
  insertar.value = "";

}

function cargarSeleccionado() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          let datos = JSON.parse(this.responseText);
          console.log(datos);
          crearOpciones(datos);
      }
  };
  xhttp.open("GET", "./php/CrearOpcion.php", true);
  xhttp.send();
}

function crearOpciones(datos) {
  let Option = "";
  for (let i = 0; i < datos.length; i++) {
      Option +=
              '<option value= "' +
              datos[i].idRSS +
              '">' +
              datos[i].RSStitle +
              "</option>";
  }
  document.getElementById("SelectRSS").innerHTML = Option;
}

let MapSort = new Map();

MapSort.set("Date", new SortByDate());
MapSort.set("Title", new SortByTitle());
MapSort.set("URL", new SortByURL());
MapSort.set("Description", new SortByDescription());
MapSort.set("Categories", new SortByCategorie());

document.getElementById("NewRSSBTN").addEventListener("click", function () {
    AddNewFeedRSS();
    loadIn();
    setTimeout(function () {
        loadOut();
    }, 2000);
});

document.getElementById("UpdateRSS").addEventListener("click", function () {
    var content = document.getElementById("Content");
    let data = document.getElementById("SelectRSS").value;
    UpdateContent("./php/ActualizarAlimentacion.php");
    getNewBySelect("./php/ObtenerContenido.php", data);
    content.style.textAlign = "left";
});

document.getElementById("SelectRSS").addEventListener("change", function () {
    let data = document.getElementById("SelectRSS").value;
    getNewBySelect("./php/ObtenerContenido.php", data);
});

document.getElementById("Selection").addEventListener("change", function () {
    let Key = document.getElementById("Selection").value;
    let Sort = MapSort.get(Key);
    Sort.sort();
});

document.getElementById("SearchBTN").addEventListener("click", function () {
    let datoAEncontrar = document.getElementById("SearchInput").value;
    SearchNew(datoAEncontrar, noticiasArray);
    document.getElementById("SearchInput").value = "";
});

function ActualizarContenido() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };
    xhttp.open("GET", "./php/ActualizarAlimentacion.php", true);
    xhttp.send();
}
