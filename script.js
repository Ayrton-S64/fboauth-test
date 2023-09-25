// Reemplaza 'tu-app-id' con tu ID de aplicación de Facebook
const appId = '696119942382503';

var appAccessToken = null;

var instagramBussinessAcount_id = null;

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
    {"fields":"name,access_token,instagram_business_account"},
    function(response) {
        console.log(response);
        if(response && response.data){
          const data = response.data;
          data.forEach(page=>{
            PageBtn = document.createElement('button');
            PageBtn.textContent = page.name;
            PageBtn.onclick = ()=>{
              appAccessToken = page.access_token;
              instagramBussinessAcount_id = page.instagram_business_account.id
            } 
            document.getElementById('paginas_container').appendChild(PageBtn)
          })
        }else{
          console.error('no se que paso en getUserPagesTokens')
        }
    }
  );
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
  console.log(appAccessToken)
  const pageId = document.getElementById('txtPageNameFeed').value
  FB.api(
    `/${pageId}/feed`,
    'GET',
    {access_token:appAccessToken},
    function(response) {
      console.log('-----{{makePageFeedBasicRequest}}-------')
        console.log(response);
    }
  );
}

function makePageMetadataBasicRequest(){
  console.log(appAccessToken)
  const pageId = document.getElementById('txtPageNameMetadata').value
  FB.api(
    `/${pageId}`,
    'GET',
    {access_token:appAccessToken,"fields":"category,fan_count,is_community_page,link,name,rating_count,talking_about_count,were_here_count,instagram_accounts{id,username,follow_count,followed_by_count,media_count},about"},
    function(response) {
      console.log('-----{{makePageMetadataBasicRequest}}-------')
        console.log(response);
    }
  );
}

// IG REQUESTS
function getInformationFromInstaPage(){
  console.log(instagramBussinessAcount_id)
  const pageId = document.getElementById('txtPageNameInstadata').value
  FB.api(
    `/${instagramBussinessAcount_id}`,
    'GET',
    {access_token:appAccessToken,"fields":"business_discovery.username(arbys){id,username,followers_count,media_count,media.limit(3){comments_count,like_count}}"},
    function(response) {
      console.log('-----{{getInformationFromInstaPage}}-------')
        console.log(response);
    }
  );
}