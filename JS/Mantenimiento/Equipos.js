var paginaActual = 1;
var registrosPorPagina = 20;
var TotalPaginas;
var Eventos = {
    AgregarEquipos: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Equipos = $('#txtEquipos').val();
        Equipos = Equipos.toUpperCase();

        $.ajax({
            url: urlAgregarEquipos,
            type: 'POST',
            data: {
                Codigo: codigo,
                Equipos: Equipos.toUpperCase()
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

    ObtenerEquiposxId: function (id) {
        $.ajax({
            url: urlObtenerEquiposxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#txtEquipos').val(response.data.Equipos);
                    $('#cmbTipo').val(response.data.Tipo);
                    $('#editId').val(id);
                    $('#Agregar').find('.modal-title').text('Editar Equipos');
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

    ActivarEquiposxID: function (id) {
        $.ajax({
            url: urlActivarEquiposxID,
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
            url: urlListarEquipos,
            method: 'GET',
            data: {
                filtro: textoBuscar,
                pagina: paginaActual,
                registrosPorPagina: registrosPorPagina
            },
            success: function (data) {
                var tbody = $('#grilla-Equipos');
                tbody.empty();

                data.forEach(function (item) {
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnActivar;
                    if (item.Estado === 'I') {
                        btnActivar = $('#templates .btnactivar').clone().attr('data-id', item.Id);
                    } else {
                        btnActivar = $('#templates .btndesactivar').clone().attr('data-id', item.Id);
                    }

                    var estadoClase = item.Estado === 'A' ? 'label-success' : 'label-danger';
                    var estadoTexto = item.Estado === 'A' ? 'Activo' : 'Inactivo';
                    TotalPaginas = item.TotalPaginas === null ? 1 : item.TotalPaginas;
                    var fila = `<tr>
                         <td class="p-1 text-center small">${item.Orden}</td>
                         <td class="p-1 small">${item.Equipos}</td>
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
        $('#txtEquipos').val('');
        $('.span-error').addClass('d-none');
    },

    ValidarCampos: function () {
        var EquiposValue = $('#txtEquipos').val().trim();

        if (EquiposValue === '') {
            $('.span-error').removeClass('d-none');
        } else {
            $('.span-error').addClass('d-none');
        }


        if (EquiposValue !== '') {
            Eventos.AgregarEquipos();
        }
    }
};




$(document).ready(async function () {
    await Utils.mostrarModalProcesando();

    Funciones.cargarGrilla();

    Utils.iniciarTemporizadorInactividad();
    $('#btnBuscar').on('click', function () {
        paginaActual = 1;
        Funciones.cargarGrilla();
    });
    $('#txtBuscar').on('keypress', function (e) {
        if (e.which === 13) { 
            e.preventDefault(); 
            paginaActual = 1; 
            Funciones.cargarGrilla(); 
        }
    });

    $('#Agregar').on('hidden.bs.modal', function () {
        Funciones.LimpiarCampos();
    });

    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Equipos');
    });
    $('#btnRefrescar').on('click', async function () {
        await Utils.mostrarModalProcesando();
        Funciones.cargarGrilla();
    });
    $('#btnGuardar').on('click', function () {
        Funciones.ValidarCampos();
    });


    $('#grilla-Equipos').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerEquiposxId(id);
    });

    $('#grilla-Equipos').on('click', '.btnactivar', function () {
        var id = $(this).attr('data-id');
        $('#codigo').val(id);
        Eventos.ActivarEquiposxID(id);
    });

    $('#grilla-Equipos').on('click', '.btndesactivar', function () {
        var id = $(this).attr('data-id');
        $('#codigo').val(id);
        Eventos.ActivarEquiposxID(id);
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

