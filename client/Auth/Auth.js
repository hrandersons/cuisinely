import Auth0Lock from 'auth0-lock';
import keys from './Auth_keys';
import history from '../components/history';

const lock = new Auth0Lock(keys.clientId, keys.domain, {
  oidcConformant: true,
  autoclose: true,
  auth: {
    redirectUrl: keys.callbackUrl,
    responseType: 'token id_token',
    audience: `https://${keys.domain}/userinfo`,
    params: {
      scope: 'openid'
    }
  }
});

export default class Auth {

  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);

  }

  login() {
    // Call the show method to display the widget.
    lock.show();
  }

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    lock.on('authenticated', this.setSession.bind(this));
    // Add a callback for Lock's `authorization_error` event
    lock.on('authorization_error', (err) => {
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
      history.replace('/login');
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/dashboard');
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/login');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
