
function cargar_pacientes() {
    var accion = "/listar_paciente";
    var token = localStorage["token"];    
    $.ajax({        
        url: URL_REST + accion,
        type: 'GET',
        headers: {'api-token':token},
        dataType: 'json',        
        success: function (data, textStatus, jqXHR) {
            if(data.codigo && data.codigo != "200") {
                alert("Hubo un error");
            } else {
                var tabla = '';
                $.each(data, function (index, item){
                    //console.log(item.cedula);
                    var axu = $.param(item);
                    tabla += '<tr>';
                    tabla += '<td>'+(index + 1)+'</td>';
                    tabla += '<td>'+item.cedula+'</td>';
                    tabla += '<td>'+item.apellidos + " "+item.nombres+'</td>';
                    tabla += '<td><a href="#" data-toggle="modal" data-target="#exampleModalScrollable" class="btn btn-primary" onclick="cargarDatosModificar('+"'"+axu+"'"+')">Modificar</a></td>';
                    tabla += '</tr>';
                });
                $("#tabla tbody").html(tabla);
            }
            
        }, error: function (jqXHR, textStatus, errorThrown) {            
            alert("casa");
            console.log(jqXHR.status + "aux");
            console.log(jqXHR);
        }
    });
}

function cargarDatosModificar(data) {
    var datos = JSON.parse('{"' + data.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    console.log(datos);
    $("#apellidos").val(datos.apellidos);
    $("#nombres").val(datos.nombres);
    $("#fecha").val(datos.fecha_nac);
    $("#dir").val(datos.direccion);
    $("#genero").val(datos.genero);
    var edadAux = calcularEdad($("#fecha").val());
    $("#edad").val(edadAux);
    $("#celular").val(datos.celular);
    $("#habitos").val(datos.telefono);
    $("#enf").val(datos.enfermedades);
    $("#enf_h").val(datos.enferm_heder);
    $("#cedula").val(datos.cedula);
    $("#fono").val(datos.telefono);
    $("#external").val(datos.external);
}