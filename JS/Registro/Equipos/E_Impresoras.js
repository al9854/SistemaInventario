var paginaActual = 1;
var registrosPorPagina = 20;
var TotalPaginas;
var Usuario;

var Eventos = {
    AgregarRegistroImpresora: function () {

        var codigo = $('#editId').val();
        codigo = parseInt(codigo, 10);
        var Area = $('#cmbArea').val();
        var Seccion = $('#cmbSeccion').val();
        var Responsable = $('#txtResponsable').val();
        var Marca = $('#txtMarca').val();
        var CodigoTinta = $('#txtCtinta').val();
        var TipoTinta = $('#cmbTtinta').val();
        var Marca = $('#txtMarca').val();
        var CodigoPF = $('#txtCodigoPF').val();
        var EstadoE = $('#cmbEstado').val();

        $.ajax({
            url: urlAgregarRegistroImpresora,
            type: 'POST',
            data: {
                Codigo: codigo,
                Area: Area,
                Seccion: Seccion,
                Responsable: Responsable.toUpperCase(),
                Marca: Marca,
                Usuario: Usuario,
                CodigoTinta: CodigoTinta,
                TipoTinta: TipoTinta,
                CodigoPF: CodigoPF,
                EstadoE: EstadoE
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

    ObtenerRegistroImpresoraxId: function (id) {
        $.ajax({
            url: urlObtenerRegistroImpresoraxId,
            type: 'GET',
            data: {
                Id: id
            },
            success: function (response) {
                if (response.success) {
                    $('#cmbArea').val(response.data.Area);
                    $('#cmbSeccion').val(response.data.Seccion);
                    $('#txtResponsable').val(response.data.Responsable);
                    $('#txtMarca').val(response.data.Marca);
                    $('#txtCodigoPF').val(response.data.CodigoPF);
                    $('#txtCtinta').val(response.data.CodigoTinta);
                    Usuario = response.data.Usuario;

                    if (response.data.TipoTinta == '1') {
                        $('#txtCtinta').removeClass('d-none');
                        $('#lblcodigo').removeClass('d-none');
                    } else {
                        $('#txtCtinta').addClass('d-none');
                        $('#lblcodigo').addClass('d-none');
                    }

                    $('#cmbTtinta').val(response.data.TipoTinta);
                    $('#cmbEstado').val(response.data.EstadoE);
                    $('#editId').val(id);
                    $('#Agregar').find('.modal-title').text('Editar Registro Impresora');
                    $('#Agregar').modal('show');
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


    EliminarRegistroImpresora: function (id) {
        $.ajax({
            url: urlEliminarRegistroImpresora,
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
    },

    TraerUsuario: function (usuario) {
        $.ajax({
            url: urlTraerUsuario,
            type: 'GET',
            data: {
                usuario: usuario
            },
            success: function (response) {
                if (response.success) {
                    $('#txtResponsable').val(response.data.Responsable) 
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

    ActualizarRegistroTinta: function () {
        var idImpresora = $('#editId').val();
        var maxHeight = $('#cylinder-black').css('height'); 
        var nivelBlack = $('#ink-level-black').css('height'); 
        var nivelCyan = $('#ink-level-cyan').css('height'); 
        var nivelYellow = $('#ink-level-yellow').css('height'); 
        var nivelMagenta = $('#ink-level-magenta').css('height'); 
        var observacion = $('#txtObservacion').val(); 

        // Convertir altura en porcentaje a nivel textual

        var getLevelFromHeight = function (height) {
            height = height.trim();

            
                const pixelValue = parseFloat(height);
                maxHeight = parseFloat(maxHeight);
                const percentageValue = (pixelValue / maxHeight) * 100; 
                height = Math.round(percentageValue);
            

            if (height > '50') {
                return 'alto';
            } else if (height > '25') {
                return 'medio';
            } else if (height > '0') {
                return 'bajo';
            } else {
                return 'bajo'; 
            }
        };

        $.ajax({
            url: urlActualizarRegistroTinta, 
            type: 'POST',
            data: {
                Id_Impresora: idImpresora,
                Nivel_BLACK: getLevelFromHeight(nivelBlack),
                Nivel_YELLOW: getLevelFromHeight(nivelYellow),
                Nivel_CYAN: getLevelFromHeight(nivelCyan),
                Nivel_MAGENTA: getLevelFromHeight(nivelMagenta),
                Observacion: observacion,
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    Funciones.cargarGrillaModal();
                } else {
                    Utils.mostrarAlerta('Error al actualizar los datos: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },

    ObtenerRegistroTintaxId: function (id) {

        $.ajax({
            url: urlObtenerRegistroTintaxId,
            type: 'GET',
            data: { Id: id },
            success: function (response) {
                if (response.success) {

                    Funciones.setInkLevel('black', response.data.Nivel_BLACK);
                    Funciones.setInkLevel('cyan', response.data.Nivel_CYAN);
                    Funciones.setInkLevel('yellow', response.data.Nivel_YELLOW);
                    Funciones.setInkLevel('magenta', response.data.Nivel_MAGENTA);
                   /* $('#txtObservacion').val(response.data.Observacion); */

                } else {
                    Utils.mostrarAlerta(response.message, 'danger');
                    Funciones.LimpiarModal();
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
            url: urlListarRegistroImpresora,
            method: 'GET',
            data: {
                filtro: textoBuscar,
                pagina: paginaActual,
                registrosPorPagina: registrosPorPagina
            },
            success: function (data) {
                var tbody = $('#grilla-impresoras');
                tbody.empty();

                if (data.item === null) {
                    Utils.cerrarModalProcesando(); }
                
                data.forEach(function (item) {
                    var btnEditar = $('#templates .btneditar').clone().attr('data-id', item.Id);
                    var btnRevision = $('#templates .btnrevision').clone().attr('data-id', item.Id);
                    var btnEliminar = $('#templates .btneliminar').clone().attr('data-id', item.Id);

                    var textoTipo;
                    var estadoeTexto;
                    var estadoeClase;
                    switch (item.EstadoE) {
                        case 1:
                            estadoeTexto = 'Funcional'
                            estadoeClase = 'label-success'
                            break;
                        case 2:
                            estadoeTexto = 'En Revisión'
                            estadoeClase = 'label-danger'
                            break;
                        default:
                            estadoeTexto = 'No Funcional'
                            estadoeClase = 'label-primary'
                            break;

                    }

                    switch (item.TipoTinta) {
                        case 1:
                            textoTipo = 'CARTUCHO'
                            break;
                        default:
                            textoTipo = 'TONER'
                            break;
                    }

                    TotalPaginas = item.TotalPaginas === null ? 1 : item.TotalPaginas;
                    CodigoTinta = item.CodigoTinta === null ? '' : item.CodigoTinta;
                    var fila = `<tr>
                         <td class="p-1 text-center small">${item.Orden}</td>
                        <td class = "p-1 small" >${item.NombreArea} - ${item.NombreSeccion}</td>
                        <td class = "p-1 small" >${item.Responsable}</td>
                        <td class = "p-1 text-center small" >${item.CodigoPF}</td>
                        <td class = "p-1 text-center small" >${item.Marca}</td>
                          <td class="p-1 text-center small ${estadoeClase}">${estadoeTexto}</td>
                        <td class = "p-1 text-center small" >${CodigoTinta}</td>
                         <td class="p-1 text-center small">
                             <div class="btn-group-action">
                         ${btnEditar.prop('outerHTML')}
                         ${item.TipoTinta === 1 ? btnRevision.prop('outerHTML') : ''}
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

    cargarGrillaModal: function () {
        var Id_Impresora = $('#editId').val();

        $.ajax({
            url: urlListarRegistroTinta,
            method: 'GET',
            data: {
                fecha: null,
                Id_Impresora: Id_Impresora,
            },
            success: function (data) {
                var tbody = $('#grilla-tintas');
                tbody.empty();

                data.forEach(function (item) {
                    var fecharver = Utils.parseDate(item.Fecha_revi);
                    var fila = `<tr>
                         <td class="p-1 text-center small">${item.Orden}</td>
                        <td class = "p-1 text-center small" >${item.Nivel_BLACK}</td>
                        <td class = "p-1 text-center small" >${item.Nivel_CYAN}</td>
                        <td class = " text-center small" >${item.Nivel_YELLOW}</td>
                        <td class = "p-1 text-center small" >${item.Nivel_MAGENTA}</td>
                        <td class = "p-1 small" >${item.Observacion}</td>
                        <td class = "p-1 text-center small" >${fecharver}</td>
                     </div>
                 </td>
             </tr>`;
                    tbody.append(fila);
                });

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
        $('#cmbArea').val(0);
        $('#txtCodigoPF').val('');
        $('#txtResponsable').val('');
        Usuario = '';
        $('#txtMarca').val('');
        $('#cmbTtinta').val(0);
        $('#txtCtinta').val('');
        $('#cmbEstado').val(0);
        $('#txtCtinta').addClass('d-none');
        $('#lblcodigo').addClass('d-none');
        $('.span-error').addClass('d-none');
    },

    LimpiarModal: function () {
        Funciones.setInkLevel('black', 'alto');
        Funciones.setInkLevel('cyan', 'alto');
        Funciones.setInkLevel('yellow', 'alto');
        Funciones.setInkLevel('magenta', 'alto');
    },

    ValidarRegistro: function () {
        var areaValue = $('#cmbArea').val();
        var responsableValue = $('#txtResponsable').val().trim();
        var estadoValue = $('#cmbEstado').val();
        var codigoPFValue = $('#txtCodigoPF').val();
        var marcaValue = $('#txtMarca').val();
        var tipoValue = $('#cmbTtinta').val();


        if (areaValue === '0') {
            $('#errorvacio1').removeClass('d-none');
        } else {
            $('#errorvacio1').addClass('d-none');
        }

        if (codigoPFValue === '') {
            $('#errorvacio2').removeClass('d-none');
        } else {
            $('#errorvacio2').addClass('d-none');
        }

        if (responsableValue === '') {
            $('#errorvacio3').removeClass('d-none');
        } else {
            $('#errorvacio3').addClass('d-none');
        }

        if (marcaValue === '') {
            $('#errorvacio4').removeClass('d-none');
        } else {
            $('#errorvacio4').addClass('d-none');
        }


        if (estadoValue === '0') {
            $('#errorvacio5').removeClass('d-none');
        } else {
            $('#errorvacio5').addClass('d-none');
        }

        if (tipoValue === '0') {
            $('#errorvacio6').removeClass('d-none');
        } else {
            $('#errorvacio6').addClass('d-none');
        }


        if (areaValue !== '0' && estadoValue != '0' && responsableValue != '' && codigoPFValue != '' && marcaValue != '' && tipoValue != '' ) {
            Eventos.AgregarRegistroImpresora();
        }
    },

    setInkLevel: function (color, level) {
        const inkLevelElement = document.getElementById(`ink-level-${color}`);
        let height;
        switch (level) {
            case 'alto':
                height = '100%';
                break;
            case 'medio':
                height = '50%';
                break;
            case 'bajo':
                height = '25%';
                break;
            default:
                height = '0%';
        }
        inkLevelElement.style.height = height;
    }


};



$(document).ready(async function () {
    await Utils.mostrarModalProcesando();
    Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
    Utils.llenarCombo(urlLlenarComboSeccion, 'cmbSeccion', 'Id', 'Value');

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
    $('input').on('keydown', function (e) {
        // Si se presiona Enter con Shift
        if (e.shiftKey && e.which == 13) {
            e.preventDefault(); // Prevenir la acción por defecto
        }
    });
    $('#Agregar').on('hidden.bs.modal', function () {
        Funciones.LimpiarCampos();
    });

    $('#btnAgregar').on('click', function () {
        $('#Agregar').find('.modal-title').text('Agregar Registro Impresora');
    });

    $('#cmbTtinta').on('change', function () {
        var selectedValue = $(this).val();

        if (selectedValue == '1') {
            $('#txtCtinta').removeClass('d-none');
            $('#lblcodigo').removeClass('d-none');
        } else {
            $('#txtCtinta').addClass('d-none');
            $('#lblcodigo').addClass('d-none');
        }
    });

    $('#btnRefrescar').on('click', async function () {
        await Utils.mostrarModalProcesando();
        Funciones.cargarGrilla();
    });
    $('#btnGuardar').on('click', function () {
        Funciones.ValidarRegistro();
    });
    $('#txtResponsable').on('input', function (e) {
         Usuario = $('#txtResponsable').val().trim();
        
        if (Usuario.length >= 6) {
            Eventos.TraerUsuario(Usuario);
        }

    });

    $('#grilla-impresoras').on('click', '.btneditar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.ObtenerRegistroImpresoraxId(id);
    });

    $('#grilla-impresoras').on('click', '.btnrevision', async function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        $('#Agregar-revision').find('.modal-title').text('Actualizar nivel de tinta');
        Eventos.ObtenerRegistroTintaxId(id);
        await Utils.mostrarModalProcesando();
        Funciones.cargarGrillaModal();
    });

    $('#grilla-impresoras').on('click', '.btneliminar', function () {
        var id = $(this).attr('data-id');
        $('#editId').val(id);
        Eventos.EliminarRegistroImpresora(id);
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


    /*Modal de tinta*/


    //Cambio de tinta

      document.querySelectorAll('.control-button').forEach(button => {
            button.addEventListener('click', () => {
                const cylinder = button.getAttribute('data-cylinder');
                const level = button.getAttribute('data-level');
                Funciones.setInkLevel(cylinder, level);
            });
        });

    $('#btnActualizar').on('click', function () {
        Eventos.ActualizarRegistroTinta();
    });

    $('#Agregar-revision').on('hidden.bs.modal', function () {
        Funciones.LimpiarModal();
        $('#editId').val('0');
    });

    /*Fin modal tinta*/


    Utils.cerrarModalProcesando();

});



