
var Eventos = {
    CargarCantidades: function () {

        $.ajax({
            url: urlCargarCantidades,
            type: 'POST',
            success: function (response) {
                if (response.success) {

                    $('#cantImpresoras').text(response.Impresoras);
                    $('#cantUsuariosVPN').text(response.UsuariosVPN);
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

$(document).ready(async function () {
    await Utils.mostrarModalProcesando();

    Eventos.CargarCantidades();
    Funciones.cargarGrilla();

    Utils.iniciarTemporizadorInactividad();
    $('#dImpresoras, #dUsuariosVPN').on('click', function (e) {
        e.preventDefault();
        var url = $(this).data('href');
        window.parent.document.getElementById('content-iframe').src = url;
    });


    Utils.cerrarModalProcesando();
});
function loadContent(url) {
    $('#content-area').load(url);
}

