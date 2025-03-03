var Utils = {
    mostrarAlerta: function (mensaje, tipo) {
        $('#alertContainer').empty();

        var alerta = $('<div class="alert alert-dismissible fade show position-fixed">')
            .addClass('alert-' + tipo) // Añadir clase según el tipo (success, info, warning, danger, etc.)
            .css({
                'font-size':'15px',
                'position':'absolute',
                'top': '10px', // Ajusta el espacio desde la parte superior
                'right': '30px', // Ajusta el espacio desde la parte derecha
                'z-index': '9999',
                'max-width': '300px',
                'margin': '0',
                'color': Utils.getTextColorForAlertType(tipo), // Aplicar color de texto según el tipo de alerta
                'background-color': 'rgba(255, 255, 255, 0.2)', // Fondo blanco con opacidad
                'border': '2px solid ' + Utils.getTextColorForAlertType(tipo), // Borde del color del tipo de alerta
                'border-radius': '5px', // Bordes redondeados para la alerta
                'padding': '10px', // Espaciado interno para el contenido
                'font-family': 'Arial, sans-serif', // Fuente Arial
                'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.2)' // Opcional: sombra para mejorar la visibilidad
            })
            .text(mensaje);

        $('#alertContainer').append(alerta);

        setTimeout(function () {
            alerta.alert('close');
        }, 2000);
    },

    getTextColorForAlertType: function (tipo) {
        switch (tipo) {
            case 'success':
                return '#155724'; // Color de texto para alerta success (verde)
            case 'info':
                return '#0c5460'; // Color de texto para alerta info (azul)
            case 'warning':
                return '#856404'; // Color de texto para alerta warning (amarillo)
            case 'danger':
                return '#721c24'; // Color de texto para alerta danger (rojo)
            default:
                return '#000000'; // Color de texto por defecto (negro) para otros tipos de alerta
        }
    },

    parseDate: function (dateString) {
        var date = new Date(parseInt(dateString.substr(6)));
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses son 0-indexados
        var year = date.getFullYear();
        return `${year}-${month}-${day}`; // Devuelve la fecha en formato dd/MM/yyyy
    },

    llenarCombo: async function (url, selectId, idProp, nameProp) {
        try {
            const response = await $.ajax({
                url: url,
                type: 'POST'
            });

            if (response.success) {
                var select = $('#' + selectId);
                select.empty();
                select.append('<option value="0" style="color :black" >Seleccione...</option>');

                response.data.forEach(function (item) {
                    select.append(`<option value="${item[idProp]}" style="color :black" >${item[nameProp]}</option>`);
                });
            } else {
                Utils.mostrarAlerta(response.message, 'danger');
            }
        } catch (xhr) {
            var errorMessage = (xhr.responseJSON && xhr.responseJSON.message) ? xhr.responseJSON.message : 'Error de sistema.';
            Utils.mostrarAlerta(errorMessage, 'danger');
        }
    },


    mostrarModalProcesando: async function () {

        $('#modalProcesando').modal('show');
    },

    cerrarModalProcesando: async function () {
        await new Promise(resolve => setTimeout(resolve, 500)); 
        $('#modalProcesando').modal('hide');
    },



    iniciarTemporizadorInactividad: function () {
        var tiempoInactividad = 180; // Tiempo en segundos (3 minutos)
        var tiempoRestante = tiempoInactividad;
        var intervalo;

        function actualizarContador() {
            if (tiempoRestante > 0) {
                tiempoRestante--;
                $('#tiempoRestante').text(Utils.formatearTiempo(tiempoRestante));
            } else {
                clearInterval(intervalo);
                Utils.cerrarSesion();
            }
        }

        function resetearTemporizador() {
            tiempoRestante = tiempoInactividad;
            $('#tiempoRestante').text(Utils.formatearTiempo(tiempoRestante));
        }

        // Configurar eventos para reiniciar el temporizador
        $(document).on('mousemove keypress click', resetearTemporizador);

        intervalo = setInterval(actualizarContador, 1000); // Actualizar cada segundo

        // Mostrar el mensaje inicial
        $('#contadorInactividad').html('<span id="tiempoRestante">Tiempo de cierre por inactividad: 03:00</span>');
    },

    formatearTiempo: function (segundos) {
        var minutos = Math.floor(segundos / 60);
        var segundosRestantes = segundos % 60;
        return `Tiempo de cierre por inactividad: ${Utils.padNumero(minutos)}:${Utils.padNumero(segundosRestantes)}`;
    },

    padNumero: function (numero) {
        return numero < 10 ? '0' + numero : numero;
    },

    cerrarSesion: function () {

        $.ajax({
            url: '/Login/CerrarSesion',
            type: 'POST',
            success: function () {
                //Se utiliza el top para redireccionar desde el index y no la vista parcial.
                window.top.location.href = '/Login/Login';
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
        
        
    }



};

$('input').on('keydown', function (e) {
    // Si se presiona Enter con Shift
    if (e.shiftKey && e.which == 13) {
        e.preventDefault(); // Prevenir la acción por defecto
    }
});