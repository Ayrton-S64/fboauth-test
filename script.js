// Reemplaza 'tu-app-id' con tu ID de aplicación de Facebook
const appId = '696119942382503';

var appAccessToken = null;

var instagramBussinessAcount_id = 17841441130334260;

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
    // window.location.href = 'login.html';
}

function getUserPagesTokens(){
  FB.api(
    '/me/accounts',
    'GET',
    {"fields":"name,username,access_token,instagram_business_account"},
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
              document.getElementById('igPageID').value = page.instagram_business_account.id;
            
              document.getElementById('fbPageID').value = page.username;
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
  const pageId = document.getElementById('fbPageID').value
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
  const pageId = document.getElementById('fbPageID').value
  FB.api(
    `/${pageId}`,
    'GET',
    {
      access_token:appAccessToken,
      "fields":"category,fan_count,is_community_page,link,name,rating_count,talking_about_count,were_here_count,instagram_accounts{id,username,follow_count,followed_by_count,media_count},about"
    },
    function(response) {
      console.log('-----{{makePageMetadataBasicRequest}}-------')
        console.log(response);
    }
  );
}

function getFacebookGeneralStatistics(){
  console.log(appAccessToken)
  const pageId = document.getElementById('fbPageID').value
  FB.api(
    `/${pageId}/insights`,
    'GET',
    {
      access_token:appAccessToken,
      "metric":"page_fans, page_fan_adds,page_actions_post_reactions_total,page_post_engagements",
      since: "2023-09-01",
      until: "2023-09-30",
      period: "day",
    },
    function(response) {
      console.log('-----{{getFacebookGeneralStatistics}}-------')
        console.log(response);
    }
  );
}

function getFacebookMetricsStatistics(){
  console.log(appAccessToken)
  const pageId = document.getElementById('fbPageID').value
  FB.api(
    `/${pageId}/feed`,
    'GET',
    {
      access_token:appAccessToken,
      "fields":"comments.summary(true), reactions.summary(true), insights.metric(post_engaged_users, post_engaged_fan,post_reactions_by_type_total)"
    },
    function(response) {
      console.log('-----{{getFacebookGeneralStatistics}}-------')
        console.log(response);
    }
  );
}

function getFacebookPostsStatistics(){
  console.log(appAccessToken)
  const pageId = document.getElementById('fbPageID').value
  FB.api(
    `/${pageId}`,
    'GET',
    {access_token:appAccessToken,"fields":"access_token, followers_count, fan_count, new_like_count, insights.metric(page_fans, page_fan_adds,page_actions_post_reactions_total,page_post_engagements),feed{id, created_time, message, shares, comments.summary(true), reactions.summary(true),insights.metric(post_engaged_users, post_engaged_fan,post_reactions_by_type_total)}"},
    function(response) {
      console.log('-----{{getFacebookPostsStatistics}}-------')
        console.log(response);
    }
  );
}

// IG REQUESTS
function getInformationFromInstaPage(){
  const igId = document.getElementById('igPageID').value
  FB.api(
    `/${igId}`,
    'GET',
    {access_token:appAccessToken,"fields":"id,username,name,profile_picture_url,biography,follows_count,followers_count,media_count"},
    function(response) {
      console.log('-----{{getInformationFromInstaPage}}-------')
        console.log(response);
    }
  );
}

function getMetricsInformationFromInstaPage(){
  const igId = document.getElementById('igPageID').value
  FB.api(
    `/${igId}/insights`,
    'GET',
    {
      access_token:appAccessToken,
      "metric":"total_interactions,likes,comments",
      period: "day",
      since: "2023-09-01",
      until: "2023-09-30",
    },
    function(response) {
      console.log('-----{{getMetricsInformationFromInstaPage}}-------')
        console.log(response);
    }
  );
}

function getMetricsInformationFromMediaInstaPage(){
  const igId = document.getElementById('igPageID').value
  FB.api(
    `/${igId}/media`,
    'GET',
    {
      access_token:appAccessToken,
      "fields":"id,caption,like_count,comments_count,permalink,media_url,media_type,insights.metric(total_interactions, likes, comments, shares, saved)"
    },
    function(response) {
      console.log('-----{{getMetricsInformationFromMediaInstaPage}}-------')
        console.log(response);
    }
  );
}