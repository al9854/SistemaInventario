var paginaActual = 1;
var registrosPorPagina = 20;
var TotalPaginas = 1;
var Eventos = {
    AgregarEquipos: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Tipo = $('#cmbTipo').val();
        var CodigoPF = $('#txtCodigoPF').val();
        var Cantidad = $('#txtCantidad').val();
        var Marca = $('#txtMarca').val();
        var EstadoE = $('#cmbEstadoE').val();
        var Responsable = $('#txtResponsable').val();
        var Fecha_modif = $('#txtFecha_modif').val();
        var Observacion = $('#txtObservacion').val();

        $.ajax({
            url: urlAgregarInventario,
            type: 'POST',
            data: {
                Codigo: codigo,
                Tipo: Tipo,
                CodigoPF: CodigoPF,
                Cantidad: Cantidad,
                Marca: Marca,
                EstadoE: EstadoE,
                Responsable: Responsable,
                Fecha_modif: Fecha_modif,
                Observacion: Observacion
            },
            success: function (response) {
                if (response.success) {
                    $('#Agregar').modal('hide');
                    Utils.mostrarAlerta(response.message, 'success');
                    Funciones.LimpiarCampos();
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
            url: urlObtenerInventarioxId,
            type: 'POST',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#cmbTipo').val(response.data.Tipo);
                    $('#txtCodigoPF').val(response.data.CodigoPF);
                    $('#txtMarca').val(response.data.Marca);
                    $('#txtCantidad').val(response.data.Cantidad);
                    $('#cmbEstadoE').val(response.data.EstadoE);
                    $('#txtResponsable').val(response.data.Responsable);
                    var Fecha = Utils.parseDate(response.data.Fecha_modif);
                    $('#txtFecha_modif').val(Fecha);
                    $('#txtObservacion').val(response.data.Observacion);
                    $('#editId').val(id);
                    $('#Agregar').find('.modal-title').text('Editar Equipos');
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

    EliminarEquipos: function (id) {
        $.ajax({
            url: urlEliminarInventarioxID,
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
            url: urlListarInventario,
            method: 'GET',
            data: {
                filtro: textoBuscar,
                pagina: paginaActual,
                registrosPorPagina: registrosPorPagina
            },
            success: function (data) {
                var tbody = $('#grilla-equipos');
                tbody.empty();

                data.forEach(function (item) {
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnEliminar = $('#templates .btneliminar').clone().attr('data-id', item.Id);

                    TotalPaginas = item.TotalPaginas === null ? 1 : item.TotalPaginas;
                    var fechamodif = item.Fecha_modif === null ? '' : Utils.parseDate(item.Fecha_modif);
                   
                    var textoEStadoE = item.EstadoE === 1 ? 'NUEVO' : 'SEMI NUEVO';

                    var fila = `<tr>
                         <td class="p-1 text-center small">${item.Orden}</td>
                        <td class = "p-1 small" >${item.NombreTipo}</td>
                        <td class = "p-1 text-center small" >${item.CodigoPF}</td>
                        <td class = "p-1 small" >${item.Marca}</td>
                        <td class = "p-1 small" >${textoEStadoE}</td>
                        <td class = "p-1 small" >${fechamodif}</td>
                        <td class = "p-1 small" >${item.Observacion}</td>
                        <td class = "p-1  small" >${item.Cantidad}</td>
                         <td class="p-1 text-center small">
                             <div class="btn-group-action">
                         ${btnEditar.prop('outerHTML')}
                         ${btnEliminar.prop('outerHTML')}
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
        $('#cmbTipo').val(0);
        $('#txtCodigoPF').val('');
        $('#txtCantidad').val('');
        $('#txtMarca').val('');
        $('#cmbEstadoE').val(0);
        $('#txtResponsable').val('');
        $('#txtFecha_modif').val(''); 
        $('#txtObservacion').val('');
        $('.span-error').addClass('d-none');
    },

    ValidarRegistro: function () {
        var areaValue = $('#cmbArea').val();
        var tipoValue = $('#cmbTipo').val();


        if (areaValue === '0') {
            $('#errorvacio1').removeClass('d-none');
        } else {
            $('#errorvacio1').addClass('d-none');
        }

        if (tipoValue === '0') {
            $('#errorvacio2').removeClass('d-none');
        } else {
            $('#errorvacio2').addClass('d-none');
        }


        if (areaValue !== '0' && tipoValue != '0') {
            Eventos.AgregarEquipos();
        }
    }
};




$(document).ready(async function () {
    await Utils.mostrarModalProcesando();
    Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
    Utils.llenarCombo(urlLlenarComboTequipos, 'cmbTipo', 'Id', 'Value');


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
    });

    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Equipos');
    });
    $('#btnRefrescar').on('click', async function () {
        await Utils.mostrarModalProcesando();
        Funciones.cargarGrilla();
    });
    $('#btnGuardar').on('click', function () {
        Funciones.ValidarRegistro();
    });

    $('#grilla-equipos').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        Eventos.ObtenerEquiposxId(id);
    });
    $('#grilla-equipos').on('click', '.btneliminar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.EliminarEquipos(id);
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


    Utils.cerrarModalProcesando();
});


