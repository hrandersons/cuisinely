import Auth0Lock from 'auth0-lock';
import keys from './Auth_keys';
export default class Auth {
  constructor (callback) {
    // Configure Auth0
    let options = {
      redirect: true,
      autoclose: true,
      allowSignUp: true,
      closable: false,
      auth: {
        //redirectUrl: 'http://localhost:8080/callback',
        params: {param1: 'value1'},
        responseType: 'token',
        sso: true
      }
    };
    this.lock = new Auth0Lock(keys.clientId, keys.domain, options);
    // Add callback for lock `authenticated` event

    this.lock.on('authenticated', this._doAuthentication.bind(this, callback));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication (callback, authResult) {
    this.setToken(authResult.idToken);
    this.lock.getUserInfo(authResult.accessToken,
      function(err, profile) {
        if (err) {
          return;
        }
        localStorage.setItem('profile', JSON.parse(profile));
      });
    this.lock.hide();
    callback();
  }

  login () {
    if (this.loggedIn()) {
      localStorage.removeItem('id_token');
    }
    this.lock.show();
  }

  loggedIn () {

    // Checks if there is a saved token and it’s still valid
    return !!this.getToken();
  }
  setToken (idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }
  getToken () {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }
  logout () {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }
}
