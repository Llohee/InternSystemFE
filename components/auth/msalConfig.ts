export const msalConfig = {
  auth: {
    clientId: 'ad4b3ae1-8e28-4040-8009-cb9e87e18c94',
    authority: "https://login.microsoftonline.com/common",
    redirectUri: 'http://localhost:5000/api/v1/auth/sso/login_aruze',
    reponse_mode: 'query'
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  }
};
