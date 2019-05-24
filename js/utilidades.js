var URL_REST = "http://localhost/~sebastian/wsdl/restfull.php";
function cargarEspecialidades() {
    var URL = "http://localhost/~sebastian/wsdl/index.php?wsdl";
    var peticion = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">';
    peticion += '<Body>';
    peticion += '<lista_especialidades xmlns="urn:server"/>';
    peticion += '</Body>';
    peticion += '</Envelope>';

    $.ajax({
        url: URL,
        data: peticion,
        type: 'POST',
        dataType: 'xml',
        contentType: 'text/xml',
        success: function (data, textStatus, jqXHR) {

            var xml = jqXHR.responseXML;
            var xmlChange = $.parseXML(xml);
            var option = '';
            $(xml).text(xmlChange).find("item").each(function () {
                var id = $(this).find("id").text();
                var nombre = $(this).find("nombre").text();
                option += '<option value="' + nombre + '">' + nombre + '</option>';
            });
            $("#especialidad").html(option);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9)
                    aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}


$(document).ready(function () {
    cargarEspecialidades();
});

function manejoErrores(xml) {
    var xmlData = $.parseXML(xml);
    var error = $(xml).find("faultstring").text();
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += error;
    mensaje += '</div>';

    $("#error").html(mensaje);
}

function redirigirPrincipal() {
    if (localStorage["usuario"] != null) {
        location.href = "principal.html";
    }
}
function redirigirLogin() {
    if (localStorage["usuario"] == null) {
        location.href = "login.html";
    }
}

function cerrar_sesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("external");
    location.href = "login.html";
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);

    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    console.log(edad);
    return edad;
}

function manejoErroresJson(msg) {    
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += msg;
    mensaje += '</div>';
    $("#error").html(mensaje);
}