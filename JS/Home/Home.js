
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


var Funciones =
{
    cargarGrilla: function () {
        $.ajax({
            url: urlListarMovimientos,
            method: 'GET',
            success: function (response) {
                var tbody = $('#grilla');
                tbody.empty();
                response.forEach(function (item) {

                    var fila = `<tr>
                        <td class="p-1 small">${item.Area}</td>
                        <td class="p-1 small">${item.Responsable}</td>
                        <td class="p-1 small">${item.Marca}</td>
                        <td class="p-1 small">${item.CodigoTinta}</td>
                        <td class="p-1 small">${item.Nivel_BLACK}</td>
                        <td class="p-1 small">${item.Nivel_CYAN}</td>
                        <td class="p-1 small">${item.Nivel_YELLOW}</td>
                        <td class="p-1 small">${item.Nivel_MAGENTA}</td>
                    </tr>`;
                    tbody.append(fila);
                });
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

