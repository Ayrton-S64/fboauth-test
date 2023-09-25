// Reemplaza 'tu-app-id' con tu ID de aplicación de Facebook
const appId = '696119942382503';

// Inicializa la SDK de Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v12.0'
    });

    // Comprueba el estado de inicio de sesión cuando se carga la página
    checkLoginStatus();
};

// Carga la SDK de Facebook de forma asíncrona
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Función para verificar el estado de inicio de sesión
function checkLoginStatus() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // El usuario está autenticado
            showContent();
        } else {
            // El usuario no está autenticado, redirige a la página de inicio de sesión
            redirectToLogin();
        }
    });
}

// Función para mostrar el contenido una vez que el usuario esté autenticado
function showContent() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<p>Bienvenido a nuestra aplicación web.</p>';
}

// Función para redirigir a la página de inicio de sesión
function redirectToLogin() {
    window.location.href = 'login.html';
}
