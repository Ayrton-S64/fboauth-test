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
};

// Carga la SDK de Facebook de forma asíncrona
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Función para iniciar sesión con Facebook en la página de inicio de sesión
document.getElementById('loginWithFacebookBtn').addEventListener('click', function() {
    FB.login(function(response) {
      console.log('respuesta de metodo login', response)
        if (response.authResponse) {
          alert('siendo redireccionado')
            // El usuario ha iniciado sesión correctamente, redirige de vuelta a index.html
            window.location.href = 'index.html';
        }
    }, {scope: 'instagram_basic,pages_read_engagement,pages_read_user_content'});
});
