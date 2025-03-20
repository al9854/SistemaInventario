$(document).ready(function () {
    // Cargar la última vista seleccionada al inicio
    var lastPartialUrl = sessionStorage.getItem('lastPartialUrl');
    if (lastPartialUrl) {
        loadContent(lastPartialUrl); // Cargar la última vista guardada
    } else
    {
        $('.tab-link a:first').trigger('click');
    }

    $('.tab-link a').on('click', function (e) {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace

        var url = $(this).data('url'); // Obtiene la URL del atributo data-url
        loadContent(url); // Llama a la función para cargar el contenido

        // Guarda la URL de la vista seleccionada en sessionStorage
        sessionStorage.setItem('lastPartialUrl', url);
    });

    function loadContent(url) {
        $.ajax({
            url: url, // Usa la URL obtenida del atributo data-url
            method: 'GET',
            success: function (response) {
                $('#content-area').html(response); // Actualiza el área de contenido
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar el contenido:", xhr.responseText);
                $('#content-area').html('<p>Error al cargar el contenido.</p>'); // Maneja errores
            }
        });
    }

    loadContent("E_Impresoras", "Registro");

});


