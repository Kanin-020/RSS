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
