
var Eventos = {

    AgregarUsuario: function()
    {
    var NombreUsuario = $('#NombreUsuario').val();
    var NuevoCodigoUsuario = $('#NuevoCodigoUsuario').val();
    var Area = $('#cmbArea').val();
    var Seccion = $('#cmbSeccion').val();
    var ContraseñaNueva = $('#ContraseñaNueva').val();

        $.ajax(
            {
                url: urlAgregarUsuario,
                type: 'POST',
                data: {
                    NombreUsuario: NombreUsuario,
                    NuevoCodigoUsuario: NuevoCodigoUsuario,
                    Area: Area,
                    Seccion: Seccion,
                    ContraseñaNueva: ContraseñaNueva

                },
                success: function (response) {
                    if (response.success) {
                        $('#btnInicio').click();
                        Utils.mostrarAlerta(response.message, 'success');
                    } else {
                        Utils.mostrarAlerta('Error al validar los datos: ' + response.message, 'danger');
                    }
                },
                error: function (jqXHR) {
                    var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                    Utils.mostrarAlerta(errorMessage, 'danger');
                }
            }
        );
    },


    ValidarUsuario: function () {
        var Codigo = $('#CodigoUsuario').val();
        var Contraseña = $('#ContraseñaUsuario').val();
        $.ajax({
            url: urlValidarUsuario,
            type: 'POST',
            data: {
                Codigo: Codigo,
                Contraseña: Contraseña
            },
            success: function (response) {
                if (response.success) {
                    window.location.href = '/Home/Index';
                } else {
                    Utils.mostrarAlerta('Error al validar los datos: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },
    DatosUsuario: function (Codigo) {
        $.ajax({
            url: urlDatosUsuario,
            type: 'POST',
            data: {
                Codigo: Codigo
            },
            success: function (response) {
                if (response.success) {
                    $('#NombreUsuario').val(response.data.NombreUsuario);
                    $('#cmbArea').val(response.data.Area);
                    $('#cmbSeccion').val(response.data.Seccion);

                } else {
                    Utils.mostrarAlerta('Error al validar los datos: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },
    CambiarContraseña: function () {
        var Codigo = $('#CodigoUsuario').val();
        var NuevaContraseña = $('#spannuevacontraseña').val();
        $.ajax({
            url: urlCambiarContraseña,
            type: 'POST',
            data: {
                Codigo: Codigo,
                NuevaContraseña: NuevaContraseña
            },
            success: function (response) {
                if (response.success) {
                    Utils.mostrarAlerta(response.message, 'success');
                    $('#spancontraseña').removeClass('d-none');
                    $('#ContraseñaUsuario').removeClass('d-none');
                    $('#iconocontraseña').removeClass('d-none');
                    $('#spannuevacontraseña').addClass('d-none');
                    $('#NuevaContraseña').addClass('d-none');
                    $('#icononuevacontraseña').addClass('d-none');
                    $('#userGroup3').addClass('d-none');
                    $('#btnIngresar').removeClass('d-none');
                    $('#btnCambiar').addClass('d-none');
                    $('#btnRegresar').addClass('d-none');
                    $('#btnnueva').removeClass('d-none');
                } else {
                    Utils.mostrarAlerta( response.message, 'danger');
                }
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    },


};


var Funciones = {
    LimpiarCampos: function () {
        $('#CodigoUsuario').val('');
        $('#ContraseñaUsuario').val('');
        $('#NuevaContraseña').val('');
        $('#ConfirmarContraseña').val('');
        $('#NombreUsuario').val('');
        $('#NuevoCodigoUsuario').val('');
        $('#NuevoCodigoTrabajador').val('');
        $('#ContraseñaNueva').val('');
        $('#RepetirContraseña').val('');
    },

};

//EXTRA CONTROLAR CERRAR SESION


$(window).on('pageshow', function (event) {
    if (event.originalEvent.persisted) {
        // La página se carga desde el cache del navegador
        cerrarSesion();
    }
});

function cerrarSesion() {
    $.ajax({
        url: '/Login/CerrarSesion',
        type: 'GET',
        success: function () {
            console.log('Sesión Cerrada');
        },
        error: function (jqXHR) {
            var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
            Utils.mostrarAlerta(errorMessage, 'danger');
        }
    });
}

$(document).ready(function () {


    $(".toggle-password").on('click', function () {
        let input = $($(this).attr("toggle"));
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            input.attr("type", "password");
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });

    $('#btnnueva').click(function () {
        $('#spancontraseña').addClass('d-none');
        $('#ContraseñaUsuario').addClass('d-none');
        $('#iconocontraseña').addClass('d-none');
        $('#btnCmabiar').addClass('d-none');
        $('#btnCambiar').addClass('d-none'); 
        $('#userGroup3').removeClass('d-none'); 
        $('#spannuevacontraseña').removeClass('d-none');
        $('#NuevaContraseña').removeClass('d-none');
        $('#icononuevacontraseña').removeClass('d-none');
        $('#btnIngresar').addClass('d-none');
        $('#btnCambiar').removeClass('d-none');
        $('#btnRegresar').removeClass('d-none');
        $('#btnnueva').addClass('d-none');
        $('#radios input[type="radio"]').prop('disabled', true);
    });
    $('#btnRegresar').click(function () {
        $('#spancontraseña').removeClass('d-none');
        $('#ContraseñaUsuario').removeClass('d-none');
        $('#iconocontraseña').removeClass('d-none');
        $('#spannuevacontraseña').addClass('d-none');
        $('#NuevaContraseña').addClass('d-none');
        $('#icononuevacontraseña').addClass('d-none');
        $('#userGroup3').addClass('d-none'); 
        $('#btnIngresar').removeClass('d-none');
        $('#btnCambiar').addClass('d-none');
        $('#btnRegresar').addClass('d-none');
        $('#btnnueva').removeClass('d-none');
        $('#radios input[type="radio"]').prop('disabled', false);
    });

    $('#btnRegistrar').click(function () {
        $('#form1').addClass('d-none');
        $('#form2').removeClass('d-none');
        Funciones.LimpiarCampos();
        $('#logocentral').addClass('rotate');
        $(".text-head1").removeClass("line-below");
        $(".text-head3").addClass("line-below");

        Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
        Utils.llenarCombo(urlLlenarComboSeccion, 'cmbSeccion', 'Id', 'Value');

    });
    $('#btnInicio').click(function () {
        $('#form1').removeClass('d-none');
        $('#form2').addClass('d-none');
        Funciones.LimpiarCampos();
        $('#logocentral').removeClass('rotate');
        $(".text-head1").addClass("line-below");
        $(".text-head3").removeClass("line-below");
    });

    $('#btnIngresar').on('click', function (event) {
        event.preventDefault();
        Eventos.ValidarUsuario()
    });

    $('#btnCambiar').on('click', function (event) {
        if ($('#spannuevacontraseña').val() == $('#NuevaContraseña').val()) {
            event.preventDefault();
            Eventos.CambiarContraseña()
        } else {
            Utils.mostrarAlerta('Las contraseñas no coinciden, intente nuevamente', 'danger');
        }
    });

    $('#btnEnviar').on('click', function (event) {

        if ($('#ContraseñaNueva').val() == $('#RepetirContraseña').val()) {
            event.preventDefault();
            Eventos.AgregarUsuario();
        } else {
            Utils.mostrarAlerta('Las contraseñas no coinciden, intente nuevamente', 'danger');
        }

    });

    $('#NuevoCodigoUsuario').on('input', function (e) {
        var Codigo = $('#NuevoCodigoUsuario').val().trim().toLowerCase();

        if (Codigo.length >= 6) {
            Eventos.DatosUsuario(Codigo);
        }

    });
    // Inicializa los tooltips
    $('[data-toggle="tooltip"]').tooltip();

}); 