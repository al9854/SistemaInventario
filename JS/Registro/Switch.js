
var Eventos = {
    AgregarSwitch: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Area = $('#cmbArea').val();
        var Sede = $('#cmbSede').val();
        var Tipo = $('#cmbTipo').val();
        var Modelo = $('#txtModelo').val();
        var Velocidad = $('#txtVelocidad').val();
        var Puertos = $('#txtPuertos').val();
        var Observacion = $('#txtObservacion').val();
        var Puertos_Uso = $('#txtPuertosenuso').val();

        $.ajax({
            url: urlAgregarSwitch,
            type: 'POST',
            data: {
                Codigo: codigo,
                Area: Area,
                Sede: Sede,
                Tipo: Tipo,
                Modelo: Modelo,
                Velocidad: Velocidad,
                Puertos: Puertos,
                Observacion: Observacion,
                Puertos_Uso: Puertos_Uso
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

    ObtenerSwitchxId: function (id) {
        $.ajax({
            url: urlObtenerSwitchxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#cmbArea').val(response.data.Area);
                    $('#cmbSede').val(response.data.Sede);
                    $('#cmbTipo').val(response.data.Tipo);
                    $('#txtModelo').val(response.data.Modelo);
                    $('#txtVelocidad').val(response.data.Velocidad);
                    $('#txtPuertos').val(response.data.Puertos);
                    $('#txtObservacion').val(response.data.Observacion);
                    $('#txtPuertosenuso').val(response.data.Puertos_Uso);
                    $('#editId').val(id);
                    $('#Agregar').find('.modal-title').text('Editar Switch');
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

    EliminarSwitchxID: function (id) {
        $.ajax({
            url: urlEliminarSwitchxID,
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
            url: urlListarConfiguracionSwitch,
            method: 'GET',
            data: { filtro: textoBuscar },
            success: function (data) {
                var tbody = $('#grilla');
                tbody.empty();
                data.forEach(function (item) {

                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnEliminar = $('#templates .btneliminar').clone().attr('data-id', item.Id);
                    var sedeTexto = item.Sede === '1' ? 'PUENTE PIEDRA' : 'LOS OLIVOS'; 
                    var tipoTexto = item.Tipo === '1' ? 'SWITCH' : 'ROUTER';
                    var Observacion = item.Observacion === null ? '' : item.Observacion;
                    var Puertosuso = item.Puertos_Uso === null ? '' : item.Puertos_Uso;


                    var fila = `<tr>
                                <td class = "p-1 text-center small" >${item.Orden}</td>
                                <td class = "p-1 small" >${sedeTexto}</td>
                                <td class = "p-1 small" >${item.NombreArea}</td>
                                <td class = "p-1 small" >${tipoTexto}</td>
                                <td class = "p-1 small" >${item.Modelo}</td>
                                <td class = "p-1 text-center small" >${item.Velocidad}</td>
                                <td class = "p-1 text-center small" >${item.Puertos}</td>
                                <td class = "p-1 small" >${Observacion}</td>
                                <td class = "p-1 text-center small" >${Puertosuso}</td>
                                <td class = "p-1 text-center small "></td>
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
        $('#cmbArea').val(0);
        $('#cmbSede').val(0);
        $('#cmbTipo').val(0);
        $('#txtMarca').val('');
        $('#txtUsuario').val('');
        $('#txtModelo').val('');
        $('#txtObservacion').val('');
        $('#txtPuertosenuso').val('');
        $('#editId').val(0);

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
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        })
    },
    ValidarRegistro: function () {
        var isValid = true;
        if (!Utils.validarcampos('#txtMarca')) isValid = false;
        if (!Utils.validarcampos('#txtUsuario')) isValid = false;
        if (!Utils.validarcampos('#txtModelo')) isValid = false;
        if (!Utils.validarcampos('#txtVelocidad')) isValid = false;
        if (!Utils.validarcampos('#txtPuerto')) isValid = false;
        if (isValid) {
            Eventos.AgregarSwitch();
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
    Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');

    Funciones.cargarGrilla();

    Utils.iniciarTemporizadorInactividad();
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
        Funciones.limpiarMensajesError();
    });

    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Switch');
    });

    $('#btnGuardar').on('click', function () {
        Funciones.ValidarRegistro();
    });

    $('#grilla').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerSwitchxId(id);
    });

    $('#grilla').on('click', '.btneliminar', function () {
        var id = $(this).attr('data-id');
        $('#codigo').val(id);
        Eventos.EliminarSwitchxID(id);
    });

    Utils.cerrarModalProcesando();
});



