
var Eventos = {
    AgregarSalidaEquipos: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Usuario = $('#txtUsuario').val();
        var NombreUsuario = $('#txtNombreUsuario').val();
        var Area = $('#cmbArea').val();
        var Seccion = $('#cmbSeccion').val();
        var Tipo = $('#cmbTipo').val();
        var CodigoPF = $('#txtCodigoPF').val();
        var Motivo = $('#txMotivo').val();
        var Operacion = "S";

        $.ajax({
            url: urlAgregarSalidaEquipos,
            type: 'POST',
            data: {
                Codigo: codigo,
                Usuario: Usuario,
                NombreUsuario: NombreUsuario,
                Area: Area,
                Seccion: Seccion,
                Tipo: Tipo,
                CodigoPF: CodigoPF,
                Operacion: Operacion,
                Motivo: Motivo,
                
            },
            success: function (response) {
                if (response.success) {
                    $('#Agregar').modal('hide');
                    Funciones.LimpiarCampos();
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
    },
    AgregarIngresoEquipos: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Usuario = $('#txtUsuario').val();
        var NombreUsuario = $('#txtNombreUsuario').val();
        var Area = 42;
        var Seccion = 43;
        var Tipo = $('#cmbTipo').val();
        var CodigoPF = $('#txtCodigoPF').val();
        var Motivo = $('#txMotivo').val();
        var Operacion = "I";

        $.ajax({
            url: urlAgregarSalidaEquipos,
            type: 'POST',
            data: {
                Codigo: codigo,
                Usuario: Usuario,
                NombreUsuario: NombreUsuario,
                Area: Area,
                Seccion: Seccion,
                Tipo: Tipo,
                CodigoPF: CodigoPF,
                Operacion: Operacion,
                Motivo: Motivo,

            },
            success: function (response) {
                if (response.success) {
                    $('#Agregar').modal('hide');
                    Funciones.LimpiarCampos();
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
    },
    ObtenerMovimientoxId: function (id) {
        $.ajax({
            url: urlObtenerMovimientoxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#cmbTipo').val(response.data.Tipo);
                    $('#txtUsuario').val(response.data.Usuario);
                    $('#txtNombreUsuario').val(response.data.NombreUsuario);
                    $('#cmbArea').val(response.data.Area);
                    $('#cmbSeccion').val(response.data.Seccion);
                    $('#txtCodigoPF').val(response.data.CodigoPF);
                    $('#txtMarca').val(response.data.Marca);
                    $('#txtMotivo').val(response.data.Motivo);
                    $('#editId').val(response.data.Id);
                    $('#Agregar').find('.modal-title').text('Editar Licencia');
                    $('#Agregar').modal('show');
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
    EliminarMovimientoEquipoxID: function (id) {
        $.ajax({
            url: urlEliminarMovimientoEquipoxID,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    Funciones.cargarGrilla();
                } else {
                    Utils.mostrarAlerta(response.message, 'danger');
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
            url: urlListarRequerimientosMovimientosEquipo,
            method: 'GET',
            data: { filtro: textoBuscar },
            success: function (data) {
                var tbody = $('#grilla');
                tbody.empty();
                data.forEach(function (item) {

                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnEliminar = $('#templates .btneliminar').clone().attr('data-id', item.Id);
                    var Fecha = item.Fecha_modif === null ? '' : Utils.parseDate(item.Fecha_modif);
                    var Operacion = item.Operacion === S ? 'SALIDA' : 'INGRESO';

                    var fila = `<tr>
                                <td class = "p-1 text-center small" >${item.Orden}</td>
                                <td class = "p-1 small" >${item.Tipo}</td>
                                <td class = "p-1 small" >${item.NombreUsuario}</td>
                                <td class = "p-1 small" >${item.Area} - ${item.Seccion}</td>
                                <td class = "p-1 small" >${item.CodigoPF}</td>
                                <td class = "p-1 small" >${Operacion}</td>
                                <td class = "p-1 small" >${item.Motivo}</td>
                                <td class = "p-1 small" >${Fecha}</td>
                                <td class = "p-1 text-center small"></td>
                            </tr>`;
                    var $fila = $(fila);
                    $fila.find('td:last').append(btnEditar).append(btnEliminar);
                    tbody.append($fila);
                });
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },
    LimpiarCampos: function () {
        $('#cmbTipo').val(0);
        $('#txtUsuario').val('');
        $('#txtNombreUsuario').val('');
        $('#cmbArea').val(0);
        $('#cmbSeccion').val(0);
        $('#txtMotivo').val('');
        $('#txtCodigoPF').val('');
        $('#txtMarca').val('');
    },
    ValidarRegistro: function () {
        var isValid = true;
        if (!Utils.validarcampos('#txtMotivo')) isValid = false;
        if (isValid) {
            Eventos.AgregarMovimientosEquipos();
        } else {
            Utils.mostrarAlerta('Los datos ignresados no son correctos:', 'danger');
        }

    },

    limpiarMensajesError: function () {
        $('.mensaje-error').remove();
        $('.is-invalid').removeClass('is-invalid');
    }


};

$(document).ready(async function () {

    await Utils.mostrarModalProcesando();

    Funciones.cargarGrilla();
    Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
    Utils.llenarCombo(urlLlenarComboArea, 'cmbDestino', 'Id', 'Value');

    Utils.iniciarTemporizadorInactividad();
    $('#btnBuscar').on('click', function () {
        Funciones.cargarGrilla();
    });

    $('#txtBuscar').on('keypress', function (e) {
        if (e.which == 13) {
            Funciones.cargarGrilla();
        }
    });

    $('#Agregar').on('hidden.bs.modal', function () {
        Funciones.LimpiarCampos();
        Funciones.limpiarMensajesError();
    });
    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Licencia');
    });

    $('#btnGuardar').on('click', function () {
        Funciones.ValidarRegistro();
    });
    $('#grilla').on('click', '.btndetalles', function () {
        var id = $(this).attr('data-id');
        Eventos.ObtenerDetallexId(id);
    });


    $('#grilla').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        Eventos.ObtenerMovimientoxId(id);
    });

    $('#grilla').on('click', '.btneliminar', function () {
        var id = $(this).attr('data-id');
        Eventos.EliminarMovimientosEquipoxID(id);
    });
    $('#btnGuardardetalle').on('click', function () {
        Eventos.ActualizarDetalle();
    });

    Utils.cerrarModalProcesando();

});
