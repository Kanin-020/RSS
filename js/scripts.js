let nA = new Array,
    npFA = new Array;

function cargarContenido(e) {
    var t = new XMLHttpRequest;
    t.onreadystatechange = function() {
        var e;
        4 == this.readyState && 200 == this.status && (crearNoticias(e = JSON.parse(this.responseText)), nA = e, npFA = JSON.parse(this.responseText))
    }, t.open("GET", e, !0), t.send()
}

function crearNoticias(t) {
    var e = document.getElementById("Content");
    let n = "";
    for (let e = 0; e < t.length; e++) n += '<div class="News">', n += "<h3>" + t[e].titulo + "</h3>", n += '<h6> Fecha: " ' + t[e].fecha + '"</h6>', n += "<p>Descripción: " + t[e].descripcion + '<a href="' + t[e].enlace + '">Read More...</a></p>', n += "<h5>" + t[e].cat + "</h5>", n += "<hr>", n += "</div>";
    e.innerHTML = n, e.style.textAlign = "left"
}

function buscarNoticias(t, n) {
    let a = new Array;
    var e = document.getElementById("Content");
    for (let e = 0; e < n.length; e++) n[e].titulo.includes(t) && a.push(n[e]);
    0 < a.length ? (e.style.textAlign = "left", crearNoticias(a)) : (e.style.fontSize = "25px", e.style.textAlign = "center", e.style.marginTop = "5rem", e.innerHTML = "No se encontraron resultados")
}

function getNoticiaSeleccionada(e, t) {
    var n = new XMLHttpRequest;
    n.onreadystatechange = function() {
        var e;
        4 == this.readyState && 200 == this.status && (crearNoticias(e = JSON.parse(this.responseText)), nA = e, npFA = JSON.parse(this.responseText))
    }, n.open("POST", e + "?data=" + t, !0), n.send()
}

function OrdenarPorTitulo() {
    this.sort = function() {
        nA.sort(function(e, t) {
            return e.titulo.toLowerCase() > t.titulo.toLowerCase() ? 1 : e.titulo.toLowerCase() < t.titulo.toLowerCase() ? -1 : 0
        }), crearNoticias(nA)
    }
}

function OrdenarPorFecha() {
    this.sort = function() {
        crearNoticias(npFA)
    }
}

function OrdenarPorEnlace() {
    this.sort = function() {
        nA.sort(function(e, t) {
            return e.enlace.toLowerCase() > t.enlace.toLowerCase() ? 1 : e.enlace.toLowerCase() < t.enlace.toLowerCase() ? -1 : 0
        }), crearNoticias(nA)
    }
}

function OrdenarPorDescripcion() {
    this.sort = function() {
        nA.sort(function(e, t) {
            return e.descripcion.toLowerCase() > t.descripcion.toLowerCase() ? 1 : e.descripcion.toLowerCase() < t.descripcion.toLowerCase() ? -1 : 0
        }), crearNoticias(nA)
    }
}

function OrdenarPorCategorias() {
    this.sort = function() {
        nA.sort(function(e, t) {
            return e.cat.toLowerCase() > t.cat.toLowerCase() ? 1 : e.cat.toLowerCase() < t.cat.toLowerCase() ? -1 : 0
        }), crearNoticias(nA)
    }
}

function activarAnimacionCargar() {
    let e = document.getElementById("loader");
    e.style.display = "block"
}

function desactivarAnimacionCargar() {
    let e = document.getElementById("loader");
    e.style.display = "none"
}

function agregarNoticiaAlimentacion() {
    var e = new XMLHttpRequest;
    let t = document.getElementById("insert-url");
    var n = document.getElementById("insert-url").value;
    e.onreadystatechange = function() {
        4 == this.readyState && 200 == this.status && (cargarSeleccionado(), cargarContenido("./php/ObtenerAlimentacion.php"))
    }, e.open("POST", "./php/AgregarAlimentacion.php? url=" + n, !0), e.send(), t.value = ""
}

function cargarSeleccionado() {
    let e = new XMLHttpRequest;
    e.onreadystatechange = function() {
        4 == this.readyState && 200 == this.status && crearOpciones(JSON.parse(this.responseText))
    }, e.open("GET", "./php/CrearOpcion.php", !0), e.send()
}

function crearOpciones(t) {
    let n = "";
    for (let e = 0; e < t.length; e++) n += '<option value= "' + t[e].idRSS + '">' + t[e].RSStitle + "</option>";
    document.getElementById("SelectRSS").innerHTML = n
}
let MapSort = new Map;

function ActualizarContenido() {
    var e = new XMLHttpRequest;
    e.onreadystatechange = function() {
        4 == this.readyState && this.status
    }, e.open("GET", "./php/ActualizarAlimentacion.php", !0), e.send()
}
MapSort.set("Date", new OrdenarPorFecha), MapSort.set("Tititulo.toLowerCasee", new OrdenarPorTitulo), MapSort.set("URL", new OrdenarPorEnlace), MapSort.set("Description", new OrdenarPorDescripcion), MapSort.set("Categories", new OrdenarPorCategorias), document.getElementById("NewRSSBTN").addEventListener("click", function() {
    agregarNoticiaAlimentacion(), activarAnimacionCargar(), setTimeout(function() {
        desactivarAnimacionCargar()
    }, 2e3)
}), document.getElementById("UpdateRSS").addEventListener("click", function() {
    var e = document.getElementById("Content"),
        t = document.getElementById("SelectRSS").value;
    ActualizarContenido("./php/ActualizarAlimentacion.php"), getNoticiaSeleccionada("./php/ObtenerContenido.php", t), e.style.textAlign = "left"
}), document.getElementById("SelectRSS").addEventListener("change", function() {
    getNoticiaSeleccionada("./php/ObtenerContenido.php", document.getElementById("SelectRSS").value)
}), document.getElementById("Selection").addEventListener("change", function() {
    var e = document.getElementById("Selection").value;
    let t = MapSort.get(e);
    t.sort()
}), document.getElementById("SearchBTN").addEventListener("click", function() {
    buscarNoticias(document.getElementById("SearchInput").value, nA), document.getElementById("SearchInput").value = ""
}), cargarContenido("./php/ObtenerAlimentacion.php", "Content"), cargarSeleccionado();