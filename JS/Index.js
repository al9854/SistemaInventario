var Eventos =
{
    ListarMenu: function () {
        $.ajax({
            url: urlListarMenu,
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                var menuHtml = "";
                data.forEach(item => {
                    /*var viewParam = encodeURIComponent(item.ruta);*/
                    if (item.Orden !== null) {

                        if (item.Suborden === 0 && item.ruta != '') {
                            menuHtml += `
                    <div class="submenu" id="submenu">
                        <div class="hover-bg"></div>
                        <div class="sub-head">
                            <div class="op-icono">
                                <i class="fa-solid ${item.Icono}"></i>
                            </div>
                            <div class="op-texto">
                                 <a href="${item.ruta}" class="simple opcion" target="content-iframe">${item.Descripcion} </a>
                            </div>
                        </div>
                    </div>`;
                        } else if (item.Suborden === 0 && item.ruta === '') {
                            menuHtml += `
                    <div class="submenu" id="submenu">
                        <div class="hover-bg"></div>
                        <div class="sub-head">
                            <div class="op-icono">
                                <i class="fa-solid ${item.Icono}"></i>
                            </div>
                            <div class="op-texto"><p>${item.Descripcion}</p></div>
                        </div>
                        <div class="sub-body">
                            <div class="collapse-menu" id="collapse-${item.Orden}">
                            </div>
                        </div>
                    </div>`;
                        } 
                    }
                });

                $('#menu').append(menuHtml);


                data.forEach(item => {
                   /* var viewParam = encodeURIComponent(item.ruta);*/
                    if (item.Suborden > 0) { 
                        /*  $(`#collapse-${item.Orden}`).append(`<a href="/Home/Index?view=${viewParam}" class="collapse__sublink opcion" target="content-iframe">${item.Descripcion}</a>`);*/
                        $(`#collapse-${item.Orden}`).append(`<a href="${item.ruta}" class="collapse__sublink opcion" target="content-iframe">${item.Descripcion}</a>`);
                    }
                });


            },
            error: function () {
                console.error('Error al cargar el menú.');
            }
        });
    },

    ObtenerRol: function () {
        $.ajax({
            url: urlObtenerRol, 
            type: 'GET',
            success: function (response) {
                    if (response.rol === 'T') {
                        Funciones.LoadContent('/Home/Home_Trabajador'); 
                    } else {
                    Funciones.LoadContent('/Home/Home');  
                }
            },
            error: function () {
                console.error('Error en la solicitud para obtener el rol.');
            }
        });
    }

}


var Funciones =
{
    Expandir: function (isExpanded) {
        if (isExpanded) {
            $("#menu").removeClass('expander');
            $("#txtlogo").removeClass('db-none');
            $("#content-area").removeClass('content-expander');
            
        } else {
            $("#menu").addClass('expander');
            $("#txtlogo").addClass('db-none');
            $("#content-area").addClass('content-expander');
        }
    },

    LoadContent: function (url) {
        if ($('#content-iframe').attr('src') !== url) {
            $('#content-iframe').attr('src', url);
            sessionStorage.setItem('lastLoadedUrl', url);
        }
    },

    // Función para recuperar la última URL cargada al iniciar la página
     retrieveLastLoadedUrl: function() {
        var lastUrl = sessionStorage.getItem('lastLoadedUrl');
         if (lastUrl) {
             Funciones.LoadContent(lastUrl);
        }
        else {
             Eventos.ObtenerRol();
        }
    },

    // Función para cargar el estado del menú desde sessionStorage
     loadMenuState: function() {
         var activeCollapse = sessionStorage.getItem('activeCollapse');
         var selectedUrl = sessionStorage.getItem('selectedUrl');

         if(activeCollapse === 'true') {
             $('.submenu .collapse-menu').addClass('open');
         }

         // Cargar la URL seleccionada en el iframe
         if (selectedUrl) {
             $('#content-iframe').attr('src', selectedUrl);
         }
     },

    // Función para guardar el estado del menú y la selección del usuario en sessionStorage
     saveMenuState: function (activeCollapse, selectedUrl) {
        sessionStorage.setItem('activeCollapse', activeCollapse);
        sessionStorage.setItem('selectedUrl', selectedUrl);
        }

}

$(document).ready(function () {
    let isRotated = false;
    let isExpanded = false;

    Eventos.ListarMenu();
    Funciones.retrieveLastLoadedUrl();
    Funciones.loadMenuState();
    $('#imglogo').on('click', function () {

        Funciones.Expandir(isExpanded);
        if (isRotated) {
            $(this).css('transform', 'rotate(0deg)');
        } else {
            $(this).css('transform', 'rotate(-180deg)');
        }
        isRotated = !isRotated;
        isExpanded = !isExpanded;
    });

    $('#menu').on('click', '.submenu', function () {
        if (!isRotated) {
            $('.submenu .collapse-menu').removeClass('open');
            $('.submenu .sub-body').removeClass('open');

            $(this).find('.collapse-menu').toggleClass('open');
            $(this).find('.sub-body').toggleClass('open');
        }
    });

    $('#menu').on('click', '.opcion', function (e) {
        e.preventDefault();

        var selectedUrl = $(this).attr('href');

        $('.opcion').removeClass('active');
        $(this).addClass('active');

        if (sessionStorage.getItem('selectedUrl') !== selectedUrl) {
            Funciones.LoadContent(selectedUrl);
            sessionStorage.setItem('selectedUrl', selectedUrl);
        }
    });

    // Manejar el evento de recargar de navegador
    $(window).on('beforeunload', function () {
        var activeCollapse = $('.submenu .collapse-menu.open').length > 0 ? 'true' : 'false';
        var selectedUrl = $('.opcion.active').attr('href') || '';
        Funciones.saveMenuState(activeCollapse, selectedUrl);
    });

    $('#menu').on('click', '.opcion', function (e) {
        e.preventDefault();

        var selectedUrl = $(this).attr('href');

        $('.opcion').removeClass('active');
        $(this).addClass('active');

        // Redirigir a index.html con el parámetro view
        var indexPage = window.location.href.split('?')[0]; // Obtener la URL base del index
        window.location.href = indexPage + '?view=' + encodeURIComponent(selectedUrl);
    });

    // Código para cargar la URL en el iframe si está presente en el parámetro view
    window.onload = function () {
        var urlParams = new URLSearchParams(window.location.search);
        var viewUrl = urlParams.get('view');

        if (viewUrl) {
            Funciones.LoadContent(decodeURIComponent(viewUrl));
        } else {
            Eventos.ObtenerRol();
        }
    };

});


