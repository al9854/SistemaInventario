
var Eventos = {
    AgregarLicencia: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Area = $('#cmbArea').val();
        var Personal = $('#txtPersonal').val();
        var Equipo = $('#txtEquipo').val(); 
        
        $.ajax({
            url: urlAgregarLicencia,
            type: 'POST',
            data: {
                Codigo: codigo,
                Area: Area,
                Personal: Personal,
                Equipo: Equipo
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

    GuardarDetalleOffice: function () {

        var codigo = $('#editId').val();
        Id_Configuracion = parseInt(codigo, 10);
        Id_Version = $('#versionofi').val();
        Licenciaofi = $('#txtLicenciaofi').val();
        Estadoofi = $('#estadoofi').val();

        $.ajax({
            url: urlGuardarDetalleOffice,
            type: 'POST',
            data: {
                Id_Configuracion: Id_Configuracion,
                Id_Version: Id_Version,
                Licenciaofi: Licenciaofi,
                Estadoofi: Estadoofi
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    $('#AgregarDetalleOffice').modal('hide');
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
    GuardarDetalleWindows: function () {

        var codigo = $('#editId').val();
        Id_Configuracion = parseInt(codigo, 10);
        Id_Version = $('#versionwin').val();
        Licenciawin = $('#txtLicenciawin').val();
        Estadowin = $('#estadowin').val();

        $.ajax({
            url: urlGuardarDetalleWindows,
            type: 'POST',
            data: {
                Id_Configuracion: Id_Configuracion,
                Id_Version: Id_Version,
                Licenciawin: Licenciawin,
                Estadowin: Estadowin
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    $('#AgregarDetalleWindows').modal('hide');
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
    ObtenerRegistroxId: function (id) {
        $.ajax({
            url: urlObtenerRegistroxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#cmbArea').val(response.data.Area);
                    $('#txtPersonal').val(response.data.Personal);
                    $('#txtEquipo').val(response.data.Equipo);
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

    ObtenerOfficexId: function (id) {
        $.ajax({
            url: urlObtenerOfficexId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#versionofi').val(response.data.Id_Version);
                    $('#txtLicenciaofi').val(response.data.Licencia);
                    $('#estadoofi').val(response.data.Estado);
                    var fechaofi = response.data.Fecha_modif === null ? '' : Utils.parseDate(response.data.Fecha_modif);
                    $('#txtfechaofi').val(fechaofi);
                    $('#AgregarDetalleOffice').modal('show');
                } else {
                    $('#versionofi').val(0);
                    $('#txtLicenciaofi').val("");
                    $('#estadoofi').val(0);
                    $('#txtfechaofi').val("");
                    $('#AgregarDetalleOffice').modal('show');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },

    ObtenerWindowsxId: function (id) {
        $.ajax({
            url: urlObtenerWindowsxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#versionwin').val(response.data.Id_Version);
                    $('#txtLicenciawin').val(response.data.Licencia);
                    $('#estadowin').val(response.data.Estado);
                    var fechamodfi = response.data.Fecha_modif === null ? '' : Utils.parseDate(response.data.Fecha_modif);
                    $('#txtfechawin').val(fechamodfi);
                    $('#AgregarDetalleWindows').modal('show');
                } else {
                    $('#versionwin').val(0);
                    $('#txtLicenciawin').val("");
                    $('#estadowin').val(0);
                    $('#txtfechawin').val("");
                    $('#AgregarDetalleWindows').modal('show');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },

    EliminarLicenciaxID: function (id) {
        $.ajax({
            url: urlEliminarLicenciaxID,
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
            url: urlListarConfiguracionLicencias,
            method: 'GET',
            data: { filtro: textoBuscar },
            success: function (data) {
                var tbody = $('#grilla');
                tbody.empty();
                data.forEach(function (item) {

                    var btndetallesofi = $('#templates .btndetallesofi').clone().attr('data-id', item.Id);
                    var btndetalleswin = $('#templates .btndetalleswin').clone().attr('data-id', item.Id);
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnEliminar = $('#templates .btneliminar').clone().attr('data-id', item.Id);

                    // Crear la fila y agregar los botones clonados
                    var fila = `<tr>
                                <td class = "p-1 text-center small" >${item.Orden}</td>
                                <td class = "p-1 small" >${item.NombreArea}</td>
                                <td class = "p-1 small" >${item.Personal}</td>
                                <td class = "p-1 small" >${item.Equipo}</td>
                                <td class = "p-1 text-center small"></td>
                            </tr>`;
                    var $fila = $(fila);
                    $fila.find('td:last').append(btnEditar).append(btnEliminar).append(btndetallesofi).append(btndetalleswin);
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
        $('#editId').val('');
        $('#txtSerie').val('');
        $('#txtUsuario').val('');
        $('#txtModelo').val('');
        $('#versionofi').val(0);
        $('#txtLicenciaofi').val("");
        $('#estadoofi').val(0);
        $('#txtfechaofi').val("");
        $('#versionwin').val(0);
        $('#txtLicenciawin').val("");
        $('#estadowin').val(0);
        $('#txtfechawin').val("");
        $('#AgregarDetalle').modal('show');
    }
};


$(document).ready(async function () {

    await Utils.mostrarModalProcesando();

    Funciones.cargarGrilla();

    Utils.iniciarTemporizadorInactividad();
    Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
    Utils.llenarCombo(urlLlenarComboOffice, 'versionofi', 'Id', 'Value');
    Utils.llenarCombo(urlLlenarComboWindows, 'versionwin', 'Id', 'Value');


    $('#btnBuscar').on('click', function () {
        Funciones.cargarGrilla();
    });

    //Controlar el enter para actualizar la caja de texto
    $('#txtBuscar').on('keypress', function (e) {
        if (e.which == 13) {
            Funciones.cargarGrilla();
        }
    });

    $('#Agregar').on('hidden.bs.modal', function () {
        Funciones.LimpiarCampos();
    });
    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Licencia');
    });

    $('#btnGuardar').on('click', function () {
        Eventos.AgregarLicencia();
    });
    $('#grilla').on('click', '.btndetallesofi', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerOfficexId(id);
    });

    $('#grilla').on('click', '.btndetalleswin', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerWindowsxId(id);
    });

    $('#grilla').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerRegistroxId(id);
    });

    $('#grilla').on('click', '.btneliminar', function () {
        var id = $(this).attr('data-id');
        $('#codigo').val(id);
        Eventos.EliminarLicenciaxID(id);
    });
    $('#btnGuardardetalleOffice').on('click', function () {
        Eventos.GuardarDetalleOffice();
    });

    $('#btnGuardardetalleWindows').on('click', function () {
        Eventos.GuardarDetalleWindows();
    });


    Utils.cerrarModalProcesando();
});
