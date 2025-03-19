import {Validar} from './General.js'


/*Botones*/

var Nueva = document.getElementById('btnNueva')
var Ingresar = document.getElementById('btnIngresar')
var Cambiar = document.getElementById('btnCambiar')
var Regresar = document.getElementById('btnRegresar')
var Inicio = document.getElementById('btnInicio')
var Registrar = document.getElementById('btnRegistrar')

/*Campos*/

var Usuario = document.getElementById('cusuario')
var Contraseña = document.getElementById('password')
var ConfirmarContraseña = document.getElementById('confirmpassword')


const AgregarUsuario = async () => {
    const NombreUsuario = document.querySelector('#NombreUsuario').value;
    const NuevoCodigoUsuario = document.querySelector('#NuevoCodigoUsuario').value;
    const Area = document.querySelector('#cmbArea').value;
    const Seccion = document.querySelector('#cmbSeccion').value;
    const ContraseñaNueva = document.querySelector('#ContraseñaNueva').value;

    /*Validar campos */
    (Validar(NombreUsuario) || Validar(NuevoCodigoUsuario) || Validar(ContraseñaNueva)) ? true : false

    try {
        const response = await fetch(urlAgregarUsuario, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                NombreUsuario,
                NuevoCodigoUsuario,
                Area,
                Seccion,
                ContraseñaNueva
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            document.querySelector('#btnInicio').click();
            Utils.mostrarAlerta(data.message, 'success');
        } else {
            Utils.mostrarAlerta('Error al validar los datos: ' + data.message, 'danger');
        }
    } catch (error) {
        Utils.mostrarAlerta('Error de sistema.', 'danger');
    }
};


var Eventos = {

    AgregarUsuario: async function () {
        var NombreUsuario = document.querySelector('#NombreUsuario').value;
        var NuevoCodigoUsuario = document.querySelector('#NuevoCodigoUsuario').value;
        var Area = document.querySelector('#cmbArea').value;
        var Seccion = document.querySelector('#cmbSeccion').value;
        var ContraseñaNueva = document.querySelector('#ContraseñaNueva').value;

        if (!NombreUsuario || !NuevoCodigoUsuario || !Area || !Seccion || !ContraseñaNueva) {
            Utils.mostrarAlerta('Todos los campos son obligatorios', 'danger');
            return;
        }

        try {
            const response = await fetch(urlAgregarUsuario, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    NombreUsuario, NuevoCodigoUsuario, Area, Seccion, ContraseñaNueva
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                document.querySelector('#btnInicio').click();
                Utils.mostrarAlerta(data.message, 'success');
            } else {
                Utils.mostrarAlerta('Error al validar los datos: ' + data.message, 'danger');
            }
        } catch (error) {
            Utils.mostrarAlerta('Error de sistema.', 'danger');
        }
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
     Usuario.value = ''; 
     Contraseña.value = '';  
     ConfirmarContraseña.value = '';  
    },

};

//EXTRA CONTROLAR CERRAR SESION


// $(window).on('pageshow', function (event) {
//     if (event.originalEvent.persisted) {
//         // La página se carga desde el cache del navegador
//         cerrarSesion();
//     }
// });

// function cerrarSesion() {
//     $.ajax({
//         url: '/Login/CerrarSesion',
//         type: 'GET',
//         success: function () {
//             console.log('Sesión Cerrada');
//         },
//         error: function (jqXHR) {
//             var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
//             Utils.mostrarAlerta(errorMessage, 'danger');
//         }
//     });
// }

document.addEventListener("DOMContentLoaded", function () {

    //Controlar el icono para visualizar contraseñas
    document.querySelectorAll('.toogle-password').forEach(toggle => {
        toggle.addEventListener('click',function(){
            let input = document.querySelector(this.getAttribute("toggle"));
            if (input) {
                if (input.type === "password") {
                    input.type = "text";
                    this.classList.remove("fa-eye");
                    this.classList.add("fa-eye-slash");
                } else {
                    input.type = "password";
                    this.classList.remove("fa-eye-slash");
                    this.classList.add("fa-eye");
                }
    
        }
        })
    });

    //Cambio de formulario
    document.getElementById('radio').addEventListener('click', () => {
        let texth = document.querySelectorAll('.texth');
        texth.forEach(text => text.classList.remove('line-below'));
        texth[Inicio.checked ? 0 : 1].classList.add('line-below');

        let signin = document.querySelector('.signin-form');
        let register = document.querySelector('.register-form');

        if (Inicio.checked) {
            signin.classList.remove('d-none');
            register.classList.add('d-none');
        } else {
            signin.classList.add('d-none');
            register.classList.remove('d-none');
        }

    });

    /***************Lógica para cambiar de contraseña**************************/
    var textcontraseña= document.getElementById('tpassword')
    var confirmar= document.getElementById('gcontraseña')

    Nueva.addEventListener('click', function (e) { 
        e.preventDefault();
        confirmar.classList.remove('d-none')
        textcontraseña.textContent = 'Nueva Contraseña'
        Contraseña.placeholder = 'Ingrese su nueva contraseña'
        Cambiar.classList.remove('d-none')
        Regresar.classList.remove('d-none')
        Ingresar.classList.add('d-none')
        Nueva.classList.add('d-none')
    });

    Regresar.addEventListener('click', function (e) { 
        e.preventDefault();
        confirmar.classList.add('d-none')
        textcontraseña.textContent = 'Contraseña'
        Contraseña.placeholder = 'Ingrese su contraseña'
        Cambiar.classList.add('d-none')
        Regresar.classList.add('d-none')
        Ingresar.classList.remove('d-none')
        Nueva.classList.remove('d-none')
        Funciones.LimpiarCampos;
    });


    Cambiar.addEventListener('click',function(e) {
        e.preventDefault(); 
        (Validar(Usuario.value) || Validar(Contraseña.value) || Validar(ConfirmarContraseña.value)) ?  alert('Usuario incorrecto') 
        : (Contraseña.value !== ConfirmarContraseña.value)? alert('Las contraseñas deben ser iguales')  
        : alert('Usuario correcto')  
        Funciones.LimpiarCampos;
    })


    /**/


    /********************Inicio de sesion**********/

    Ingresar.addEventListener('click',function(e){
        e.preventDefault();
       (Validar(Usuario.value) || Validar(Contraseña.value)) ? alert('Usuario incorrecto') : alert('Usuario correcto') 
    })
    /**/
    
    


});

// $(document).ready(function () {
//     $('#btnnueva').click(function () {
//         $('#spancontraseña').addClass('d-none');
//         $('#ContraseñaUsuario').addClass('d-none');
//         $('#iconocontraseña').addClass('d-none');
//         $('#btnCmabiar').addClass('d-none');
//         $('#btnCambiar').addClass('d-none'); 
//         $('#userGroup3').removeClass('d-none'); 
//         $('#spannuevacontraseña').removeClass('d-none');
//         $('#NuevaContraseña').removeClass('d-none');
//         $('#icononuevacontraseña').removeClass('d-none');
//         $('#btnIngresar').addClass('d-none');
//         $('#btnCambiar').removeClass('d-none');
//         $('#btnRegresar').removeClass('d-none');
//         $('#btnnueva').addClass('d-none');
//         $('#radios input[type="radio"]').prop('disabled', true);
//     });

//     $('#btnRegresar').click(function () {
//         $('#spancontraseña').removeClass('d-none');
//         $('#ContraseñaUsuario').removeClass('d-none');
//         $('#iconocontraseña').removeClass('d-none');
//         $('#spannuevacontraseña').addClass('d-none');
//         $('#NuevaContraseña').addClass('d-none');
//         $('#icononuevacontraseña').addClass('d-none');
//         $('#userGroup3').addClass('d-none'); 
//         $('#btnIngresar').removeClass('d-none');
//         $('#btnCambiar').addClass('d-none');
//         $('#btnRegresar').addClass('d-none');
//         $('#btnnueva').removeClass('d-none');
//         $('#radios input[type="radio"]').prop('disabled', false);
//     });

//     $('#btnRegistrar').click(function () {
//         $('#form1').addClass('d-none');
//         $('#form2').removeClass('d-none');
//         Funciones.LimpiarCampos();
//         $(".text-head1").removeClass("line-below");
//         $(".text-head3").addClass("line-below");

//         Utils.llenarCombo(urlLlenarComboArea, 'cmbArea', 'Id', 'Value');
//         Utils.llenarCombo(urlLlenarComboSeccion, 'cmbSeccion', 'Id', 'Value');

//     });
//     $('#btnInicio').click(function () {
//         $('#form1').removeClass('d-none');
//         $('#form2').addClass('d-none');
//         Funciones.LimpiarCampos();
//         $(".text-head1").addClass("line-below");
//         $(".text-head3").removeClass("line-below");
//     });

//     $('#btnIngresar').on('click', function (event) {
//         event.preventDefault();
//         Eventos.ValidarUsuario()
//     });

//     $('#btnCambiar').on('click', function (event) {
//         if ($('#spannuevacontraseña').val() == $('#NuevaContraseña').val()) {
//             event.preventDefault();
//             Eventos.CambiarContraseña()
//         } else {
//             Utils.mostrarAlerta('Las contraseñas no coinciden, intente nuevamente', 'danger');
//         }
//     });

//     $('#btnEnviar').on('click', function (event) {

//         if ($('#ContraseñaNueva').val() == $('#RepetirContraseña').val()) {
//             event.preventDefault();
//             Eventos.AgregarUsuario();
//         } else {
//             Utils.mostrarAlerta('Las contraseñas no coinciden, intente nuevamente', 'danger');
//         }

//     });

//     $('#NuevoCodigoUsuario').on('input', function (e) {
//         var Codigo = $('#NuevoCodigoUsuario').val().trim().toLowerCase();

//         if (Codigo.length >= 6) {
//             Eventos.DatosUsuario(Codigo);
//         }

//     });
//     // Inicializa los tooltips
//     $('[data-toggle="tooltip"]').tooltip();

// }); 