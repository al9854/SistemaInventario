
var Eventos = {
    AgregarActividadesDiarias: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Usuario = $('#cmbUsuario').val();
        var Area = $('#cmbArea').val();
        var Etapa = $('#cmbEtapa').val();
        var Motivo = $('#txtMotivo').val();

        $.ajax({
            url: urlAgregarActividadesDiarias,
            type: 'POST',
            data: {
                Codigo: codigo,
                Usuario: Usuario,
                Area: Area,
                Etapa: Etapa,
                Motivo: Motivo

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
    ActualizarDetalleActividad: function () {

        var codigo = $('#editId').val();
        Id_Actividad = parseInt(codigo, 10);
        CodigoPF = $('#txtCodigoPF').val();
        Equipo = $('#cmbEquipo').val();
        Estado_Equipo = $('#cmbEstado_Equipo').val();
        Observacion = $('#txtObservacion').val();

        $.ajax({
            url: urlActualizarDetalleActividad,
            type: 'POST',
            data: {
                Id_Actividad: Id_Actividad,
                CodigoPF : CodigoPF,
                Equipo: Equipo,
                Estado_Equipo: Estado_Equipo,
                Observacion: Observacion
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    $('#ActualizarDetalle').modal('hide');
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
    ObtenerActividadxId: function (id) {
        $.ajax({
            url: urlObtenerActividadxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#txtCodigoPF').val(response.data.CodigoPF);
                    $('#cmbUsuario').val(response.data.Usuario);
                    $('#cmbArea').val(response.data.Area);
                    $('#cmbEtapa').val(response.data.Etapa);
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
    ObtenerDetalleActividadxId: function (id) {
        $.ajax({
            url: urlObtenerDetalleActividadxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#editId').val(response.data.Id_Actividad);
                    $('#cmbEquipo').val(response.data.Equipo);
                    $('#cmbEstado_Equipo').val(response.data.Estado_Equipo);
                    $('#txtObservacion').val(response.data.Observacion);
                    $('#ActualizarDetalle').modal('show');
                } else {
                    $('#txtEquipo').val("");
                    $('#cmbEstado_Equipo').val(0);
                    $('#txtObservacion').val("");
                    $('#ActualizarDetalle').modal('show');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },
    EliminarctividadxId: function (id) {
        $.ajax({
            url: urlEliminarctividadxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    Funciones.cargarGrilla();
                } else {
                    Utils.mostrarAlerta('Error al eliminar los datos: ' + response.message, 'danger');
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
        var mes = $('#cmbMes').val();
        var año = $('#cmbAño').val();
        if (mes == null) { mes = 0 }
        if (año == null) { año = 0 }

        $.ajax({
            url: urlListarRequerimientosActividadesDiarias,
            method: 'GET',
            data: {
                filtro: textoBuscar,
                mes: mes,
                año: año
            },
            success: function (data) {
                var tbody = $('#grilla');
                tbody.empty();
                data.forEach(function (item) {

                    var btndetalles = $('#templates .btndetalles').clone().attr('data-id', item.Id);
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnEliminar = $('#templates .btneliminar').clone().attr('data-id', item.Id);
                    var Fecha = item.Fecha_modif === null ? '' : Utils.parseDate(item.Fecha_modif);
                    var EstadoClase;
                    var EstadoTexto;
                    switch (item.Etapa) {
                        case 1:
                            EstadoTexto = 'TERMINADO';
                            EstadoClase = '#28a745';
                            break;
                        case 2:
                            EstadoTexto = 'PENDIENTE';
                            EstadoClase = '#dc3545';
                            break;
                        default:
                            EstadoTexto = 'PROCESO';
                            EstadoClase = '#6c757d';
                            break;
                    }

                    var fila = `<tr>
                                <td class = "p-1 text-center small" >${item.Orden}</td>
                                <td class = "p-1 small" >${item.Usuario}</td>
                                <td class = "p-1 small" >${item.NombreArea}</td>
                                <td class = "p-1 small" >${item.Motivo}</td>
                                 <td class="p-1 text-center small" style="background-color:${EstadoClase}; ">${EstadoTexto}</td>
                                <td class = "p-1 text-center small " >${Fecha}</td>
                                <td class = "p-1 text-center small"></td>
                            </tr>`;
                    var $fila = $(fila);
                    $fila.find('td:last').append(btnEditar).append(btnEliminar).append(btndetalles);
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
        $('#cmbUsuario').val(0);
        $('#cmbArea').val(0);
        $('#cmbEtapa').val(0);
        $('#txtCodigoPF').val('');
        $('#txtMotivo').val('');
        $('#txtEquipo').val('');
        $('#cmbEstado_Equipo').val('');
        $('#txtObservacion').val('');
        $('#AgregarDetalle').modal('show');
    },
    ValidarRegistro: function () {
        var isValid = true;
        if (!Utils.validarcampos('#txtMotivo'))
            isValid = false;
        if (isValid) {
            Eventos.AgregarActividadesDiarias();
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


    await Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
    await Utils.llenarCombo(urlLlenarComboMes, 'cmbMes', 'Id', 'Value');
    await Utils.llenarCombo(urlLlenarComboAño, 'cmbAño', 'Id', 'Value');
    await Utils.llenarCombo(urlLlenarComboUsuarios, 'cmbUsuario', 'Id_Caracter', 'Value');


    Funciones.cargarGrilla();

    Utils.iniciarTemporizadorInactividad();

    $('#cmbMes, #cmbAño').on('change', function () {
        Funciones.cargarGrilla();
    });
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
        $('#Agregar').find('.modal-title').text('Agregar Actividad');
    });

    $('#btnGuardar').on('click', function () {
        Funciones.ValidarRegistro();
    });
    $('#grilla').on('click', '.btndetalles', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerDetalleActividadxId(id);
    });

    $('#grilla').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerActividadxId(id);
    });
    $('#grilla').on('click', '.btneliminar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.EliminarctividadxId(id);
    });
    $('#btnGuardardetalle').on('click', function () {
        Eventos.ActualizarDetalleActividad();
    });


});
