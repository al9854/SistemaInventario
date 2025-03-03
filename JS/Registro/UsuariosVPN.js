var paginaActual = 1;
var registrosPorPagina = 20;
var TotalPaginas;
var Eventos = {
    AgregarUsuariosVPN: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Nombre = $('#txtNombre').val();
        var Usuario = $('#txtUsuario').val();
        var Contraseña = $('#txtContraseña').val();
        var Area = $('#cmbArea').val();
        var Sede = $('#cmbSede').val();

        $.ajax({
            url: urlAgregarUsuariosVPN,
            type: 'POST',
            data: {
                Codigo: codigo,
                Nombre: Nombre.toUpperCase(),
                Usuario: Usuario,
                Contraseña: Contraseña,
                Area: Area,
                Sede: Sede
            },
            success: function (response) {
                if (response.success) {
                    $('#Agregar').modal('hide');
                    Utils.mostrarAlerta(response.message, 'success');
                    Funciones.LimpiarCampos();
                    Funciones.cargarGrilla();
                } else {
                    Utils.mostrarAlerta('Error al agregar los datos: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },

    ObtenerUsuariosVPNxId: function (id) {
        $.ajax({
            url: urlObtenerUsuariosVPNxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#fechaBajaContainer').removeClass('d-none');
                    $('#txtNombre').val(response.data.Nombre);
                    $('#txtUsuario').val(response.data.Usuario);
                    $('#txtContraseña').val(response.data.Contraseña);
                    $('#cmbArea').val(response.data.Area);
                    $('#cmbSede').val(response.data.Sede);
                    $('#txtFecha_modif').val(Utils.parseDate(response.data.Fecha_modif));
                    var fechaBaja = response.data.Fecha_baja === null ? '' : Utils.parseDate(response.data.Fecha_baja);
                    $('#txtFecha_baja').val(fechaBaja);
                    $('#editId').val(id);
                    $('#Agregar').find('.modal-title').text('Editar UsuariosVPN');
                    $('#Agregar').modal('show');
                } else {
                    Utils.mostrarAlerta(response.message, 'danger');
                }
            },
            error: function () {
                var errorMessage = (xhr.responseJSON && xhr.responseJSON.message) ? xhr.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },

    DatosFijos: function (Usuario) {
        var Usuario = Usuario;
        $.ajax({
            url: urlDatosFijos,
            type: 'GET',
            data: {
                Usuario: Usuario
            },
            success: function (response) {
                if (response.success) {
                    // Obtén el elemento <select> y la opción seleccionada
                    var selectElement = document.getElementById('cmbArea');
                    var selectedOption = selectElement.options[selectElement.selectedIndex];
                    var selectValue = selectedOption.text;

                    // Genera un número aleatorio entre 100 y 999
                    var numeroAleatorio = Math.floor(Math.random() * 900) + 100;

                    // Aplica la función de capitalización
                    var selectValueCapitalizado = Funciones.capitalizarPrimeraLetra(selectValue);
                    var apellidoCapitalizado = Funciones.capitalizarPrimeraLetra(response.data.Apellido);

                    // Crea la cadena concatenada
                    var concat = selectValueCapitalizado.substring(0, 3) + numeroAleatorio + apellidoCapitalizado.substring(0, 3);

                   
                    $('#txtNombre').val(response.data.Nombre);
                    $('#txtContraseña').val(concat);
                } else {
                    Utils.mostrarAlerta(response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });

    },


    CopiarUsuario: function (id) {
        $.ajax({
            url: urlCopiarUsuario,
            type: 'GET',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    var UsuarioCopia = response.data.Usuario
                    var ContraseñaCopia = response.data.Contraseña

                    // Crear el texto a copiar
                    var textoACopiar = 'Usuario: ' + UsuarioCopia + '\nContraseña: ' + ContraseñaCopia;

                    // Usar la API del portapapeles moderna, solo si existe SSL (Crear un SSL autofirmado)
                    navigator.clipboard.writeText(textoACopiar)

                        navigator.clipboard.writeText(textoACopiar);
                        Utils.mostrarAlerta(response.message, 'success');

                

                     Utils.mostrarAlerta(response.message, 'success');

                } else {

                    Utils.mostrarAlerta(response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },


    CesarUsuarioVPN: function (id) {
        $.ajax({
            url: urlCesarUsuarioVPN,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    Funciones.cargarGrilla();
                } else {
                    Utils.mostrarAlerta('Error al agregar los datos: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    }


};


var Funciones =
{
    cargarGrilla: function () {
        var textoBuscar = $('#txtBuscar').val();

        $.ajax({
            url: urlListarRegistroUsuariosVPN,
            method: 'GET',
            data: {
                filtro: textoBuscar,
                pagina: paginaActual,
                registrosPorPagina: registrosPorPagina
            },
            success: function (data) {
                var tbody = $('#grilla-usuariosvpn');
                tbody.empty();

                data.forEach(function (item) {
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnCopiar = $('#templates .btncopiar').clone().attr('data-id', item.Id);
                    var btnCesar = $('#templates .btncesar').clone().attr('data-id', item.Id);

                    // Formatea la fecha
                    var fechaModif = Utils.parseDate(item.Fecha_modif);
                    var fechaBaja = item.Fecha_baja ? Utils.parseDate(item.Fecha_baja) : '';

                   var estadoClase = item.Estado === 'A' ? 'text-success' : 'text-danger';
                   var estadoTexto = item.Estado === 'A' ? 'Activo' : 'Inactivo';

                    var estadoClase = item.Estado === 'A' ? 'label-success' : 'label-danger';
                    var estadoTexto = item.Estado === 'A' ? 'Activo' : 'Inactivo';

                    TotalPaginas = item.TotalPaginas === null ? 1 : item.TotalPaginas;

                    var fila = `<tr>
                         <td class="p-1 text-center small">${item.Orden}</td>
                        <td class = "p-1 small" >${item.NombreArea}</td>
                        <td class = "p-1 small" >${item.Nombres}</td>
                        <td class = " small" >${item.Usuario}</td>
                        <td class = "p-1 small" >${item.Contraseña}</td>
                          <td class="p-1 text-center small ${estadoClase}" data-toggle="tooltip" title="Cese: ${fechaBaja}">${estadoTexto}</td>
                        <td class = "p-1 text-center small" >${fechaModif}</td>
                         <td class="p-1 text-center small">
                             <div class="btn-group-action">
                         ${btnEditar.prop('outerHTML')}
                         ${btnCopiar.prop('outerHTML')}
                         ${item.Estado === 'A' ? btnCesar.prop('outerHTML') : ''}
                     </div>
                 </td>
             </tr>`;
                    var $fila = $(fila);
                    tbody.append($fila);
                });

                // Actualizar el contador de páginas
                $('#contadorRegistros').text(`Mostrando ${paginaActual} de ${TotalPaginas}`);

                Utils.cerrarModalProcesando();
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },

    LimpiarCampos: function () {
        $('#editId').val('0');
        $('#txtNombre').val('');
        $('#txtUsuario').val('');
        $('#txtContraseña').val('');
        $('#cmbArea').val(0);
        $('#cmbSede').val(0);
        $('.span-error').addClass('d-none');
    },

     llenarComboAreas: function () {
        $.ajax({
            url: '/tuController/ObtenerAreas', 
            type: 'POST',
            success: function (response) {
                if (response.success) {
                    var cmbArea = $('#cmbArea');
                    cmbArea.empty(); 
                    cmbArea.append('<option value="0">Seleccione...</option>'); 

                   
                    response.data.forEach(function (area) {
                        cmbArea.append(`<option value="${area.Id}">${area.Area}</option>`);
                    });
                } else {
                    Utils.mostrarAlerta('Error al obtener las áreas: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR)  {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        })
    },
    ValidarRegistro: function ()  {
            var areaValue = $('#cmbArea').val();
            var sedeValue = $('#cmbSede').val();
            var usuarioValue = $('#txtUsuario').val().trim();


            if (areaValue === '0') {
                $('#errorvacio1').removeClass('d-none');
            } else {
                $('#errorvacio1').addClass('d-none');
            }

            if (sedeValue === '0') {
                $('#errorvacio2').removeClass('d-none');
            } else {
                $('#errorvacio2').addClass('d-none');
            }

            if (usuarioValue === '') {
                $('#errorvacio3').removeClass('d-none');
            } else {
                $('#errorvacio3').addClass('d-none');
            }


            if (areaValue !== '0' && sedeValue != '0' && usuarioValue != '') {
                Eventos.AgregarUsuariosVPN();
            }
        },

        capitalizarPrimeraLetra: function (cadena) {
        if (!cadena) return cadena; 
        return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
        }
};




$(document).ready(async function () {
    await Utils.mostrarModalProcesando();
    Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');


    $('#txtFecha_modif').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        orientation: 'top'
    });

    $('#txtFecha_baja').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        orientation: 'top'
    });

    Funciones.cargarGrilla();


    Utils.iniciarTemporizadorInactividad();
    $('#btnBuscar').on('click', function () {
        paginaActual = 1;
        Funciones.cargarGrilla();
    });

    //Controlar el enter para actualizar la caja de texto
    $('#txtBuscar').on('keypress', function (e) {
        if (e.which == 13) {
            paginaActual = 1;
            Funciones.cargarGrilla();
        }
    });

    $('#Agregar').on('hidden.bs.modal', function () {
        Funciones.LimpiarCampos();
        $('#fechaBajaContainer').addClass('d-none');
    });

    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar UsuariosVPN');
    });
    $('#btnRefrescar').on('click', async function () {
        await Utils.mostrarModalProcesando();
        Funciones.cargarGrilla();
    });
    $('#btnGuardar').on('click', function () {
        Funciones.ValidarRegistro();
    });
    $('#txtUsuario').on('input', function (e) {
        var Usuario = $('#txtUsuario').val().trim();

        if (Usuario.length >= 6) {
            Eventos.DatosFijos(Usuario);
        }
    });

    $('#grilla-usuariosvpn').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerUsuariosVPNxId(id);
    });
    $('#grilla-usuariosvpn').on('click', '.btncopiar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.CopiarUsuario(id);
    });
    $('#grilla-usuariosvpn').on('click', '.btncesar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.CesarUsuarioVPN(id);
    });


    // Manejo de eventos para cambiar de página
    $('#btnSiguiente').on('click', function () {
        if (TotalPaginas > paginaActual) { paginaActual++; Funciones.cargarGrilla(); }
    });

    $('#btnAnterior').on('click', function () {
        if (paginaActual > 1) {
            paginaActual--;
            Funciones.cargarGrilla();
        }
    });
    // Inicializa los tooltips

    $('[data-toggle="tooltip"]').tooltip();

    Utils.cerrarModalProcesando();
});


