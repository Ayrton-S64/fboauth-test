// Reemplaza 'tu-app-id' con tu ID de aplicación de Facebook
const appId = '696119942382503';

var appAccessToken = null;

// Inicializa la SDK de Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v18.0'
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
      console.log('checking connection status: ', response);
        if (response.status === 'connected') {
            // El usuario está autenticado
            saveAccessToken();
            getUserPagesTokens()
            console.log('sessión encontrada')
            showContent();
        } else {
            // El usuario no está autenticado, redirige a la página de inicio de sesión
            console.log('usuario no conectado')
            redirectToLogin();
        }
    });
}

function saveAccessToken(token){
  window.localStorage.setItem('fb-access-token', token);
}

function getAccessToken(){
  return window.localStorage.getItem('fb-access-token');
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

function getUserPagesTokens(){
  FB.api(
    '/me/accounts',
    'GET',
    {"fields":"name,access_token"},
    function(response) {
        console.log(response);
        if(response && response.data){
          const data = data;
          data.forEach(page=>{
            PageBtn = document.createElement('button');
            PageBtn.textContent = page.name;
            PageBtn.onclick = ()=>{
              setPageAccessToken(page.acces_token)
            } 
          })
        }else{
          console.error('no se que paso en getUserPagesTokens')
        }
    }
  );
}

function setPageAccessToken(page_token){
  appAccessToken = page_token;
}

function makeMeRequest(){
  FB.api(
    '/me',
    'GET',
    {},
    function(response) {
      console.log('-----{{makeMeRequest}}-------')
        console.log(response);
    }
  );
}
function makePageFeedBasicRequest(){
  const pageId = document.getElementById('txtPageNameFeed').value
  FB.api(
    `/${pageId}/feed`,
    'GET',
    {"access_token":page_token},
    function(response) {
      console.log('-----{{makePageFeedBasicRequest}}-------')
        console.log(response);
    }
  );
}

function makePageMetadataBasicRequest(){
  const pageId = document.getElementById('txtPageNameMetadata').value
  FB.api(
    `/${pageId}`,
    'GET',
    {"access_token":page_token,"fields":"category,fan_count,is_community_page,link,name,rating_count,talking_about_count,were_here_count,instagram_accounts{id,username,follow_count,followed_by_count,media_count},about"},
    function(response) {
        // Insert your code here
    }
  );
}