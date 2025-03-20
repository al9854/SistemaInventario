$(document).ready(function () {
    let isReloading = false;

    // Prevenir que se cree otra ventana al presionar Shift + Enter
    $('input').on('keydown', function (e) {
        if (e.shiftKey && e.which == 13) {
            e.preventDefault(); // Prevenir la acción por defecto
        }
    });

    // Marca que estamos recargando al salir
    $(window).on('beforeunload', function () {
        isReloading = true;
    });

    // Maneja el evento unload
    $(window).on('unload', function () {
        if (!isReloading) {
            $.ajax({
                url: '/Login/CerrarSesion',
                type: 'POST',
                success: function () {
                    window.top.location.href = '/Login/Login';
                },
                error: function (jqXHR) {
                    var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                    Utils.mostrarAlerta(errorMessage, 'danger');
                }
            });
            sessionStorage.clear();
        }
    });

    // Detectar navegación hacia atrás
    window.addEventListener('popstate', function (event) {
        // Aquí puedes llamar a la lógica de cierre de sesión si es necesario
        $.ajax({
            url: '/Login/CerrarSesion',
            type: 'POST',
            success: function () {
                window.top.location.href = '/Login/Login';
            },
            error: function (jqXHR) {
                var errorMessage = (jqXHR.responseJSON && jqXHR.responseJSON.message) ? jqXHR.responseJSON.message : 'Error de sistema.';
                Utils.mostrarAlerta(errorMessage, 'danger');
            }
        });
    });
});
