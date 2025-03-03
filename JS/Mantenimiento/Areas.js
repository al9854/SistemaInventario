var paginaActual = 1;
var registrosPorPagina = 20;
var TotalPaginas;
var Eventos = {
    AgregarAreas: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var area = $('#txtArea').val();
        area = area.toUpperCase();
        var tipo = $('#cmbTipo').val();

        $.ajax({
            url: urlAgregarAreas,
            type: 'POST',
            data: {
                Codigo: codigo,
                Area: area.toUpperCase(),
                Tipo: tipo
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

    ObtenerAreasxId: function (id) {
        $.ajax({
            url: urlObtenerAreasxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#txtArea').val(response.data.Area);
                    $('#cmbTipo').val(response.data.Tipo);
                    $('#editId').val(id);
                    $('#Agregar').find('.modal-title').text('Editar Area');
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

    ActivarAreasxID: function (id) {
        $.ajax({
            url: urlActivarAreasxID,
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
            url: urlListarAreas,
            method: 'GET',
            data: {
                filtro: textoBuscar,
                pagina: paginaActual,
                registrosPorPagina: registrosPorPagina
            },
            success: function (data) {
                var tbody = $('#grilla-area');
                tbody.empty();

                data.forEach(function (item) {
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnActivar;
                    if (item.Estado === 'I') {
                        btnActivar = $('#templates .btnactivar').clone().attr('data-id', item.Id);
                    } else {
                        btnActivar = $('#templates .btndesactivar').clone().attr('data-id', item.Id);
                    }
                    var tipoTexto = item.Tipo === 'A' ? 'Área' : 'Sección';

                    var estadoClase = item.Estado === 'A' ? 'label-success' : 'label-danger';
                    var estadoTexto = item.Estado === 'A' ? 'Activo' : 'Inactivo';
                    TotalPaginas = item.TotalPaginas === null ? 1 : item.TotalPaginas;
                    var fila = `<tr>
                         <td class="p-1 text-center small">${item.Orden}</td>
                         <td class="p-1 small">${item.Area}</td>
                         <td class=" small">${tipoTexto}</td>
                         <td class="p-1 text-center small ${estadoClase}">${estadoTexto}</td>
                         <td class="p-1 text-center small">
                             <div class="btn-group-action">
                         ${btnEditar.prop('outerHTML')}
                         ${btnActivar.prop('outerHTML')}
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
        $('#txtArea').val('');
        $('.span-error').addClass('d-none');
    },

    ValidarCampos: function () {
        var areaValue = $('#txtArea').val().trim();
        var tipoValue = $('#cmbTipo').val();

        if (areaValue === '') {
            $('.span-error').removeClass('d-none');
        } else {
            $('.span-error').addClass('d-none');
        }

        if (tipoValue == '0') {
            $('.span-error').removeClass('d-none');
        } else {
            $('.span-error').addClass('d-none');
        }

        if (areaValue !== '' && tipoValue != '0') {
            Eventos.AgregarAreas();
        }
    }
};




$(document).ready(async function () {
    await Utils.mostrarModalProcesando();

    Funciones.cargarGrilla();

    Utils.iniciarTemporizadorInactividad();
    $('#btnBuscar').on('click', function () {
        paginaActual=1;
        Funciones.cargarGrilla();
    });

    $('#txtBuscar').on('keypress', function (e) {
        if (e.which == 13) {
            paginaActual = 1;
            Funciones.cargarGrilla();
        }
    });

    $('#Agregar').on('hidden.bs.modal', function () {
        Funciones.LimpiarCampos();
    });

    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Area');
    });
    $('#btnRefrescar').on('click', async function () {
        await Utils.mostrarModalProcesando();
        Funciones.cargarGrilla();
    });
    $('#btnGuardar').on('click', function () {
        Funciones.ValidarCampos();
    });


    $('#grilla-area').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerAreasxId(id);
    });

    $('#grilla-area').on('click', '.btnactivar', function () {
        var id = $(this).attr('data-id');
        $('#codigo').val(id);
        Eventos.ActivarAreasxID(id);
    });

    $('#grilla-area').on('click', '.btndesactivar', function () {
        var id = $(this).attr('data-id');
        $('#codigo').val(id);
        Eventos.ActivarAreasxID(id);
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
});

