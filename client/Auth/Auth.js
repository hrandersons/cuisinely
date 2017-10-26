import Auth0Lock from 'auth0-lock';
import keys from './Auth_keys';
import history from '../components/history';
console.log('Keys --> callback --> ', keys.callbackUrl);
const lock = new Auth0Lock('sNfZXyIkcjg3QZve68HJXoGfzFVZgjE4', 'ifeedme.auth0.com', {
  oidcConformant: false,
  autoclose: true,
  redirect: true,
  closable: false,
  allowSignUp: true,
  auth: {
    //redirectUrl: keys.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile'
  }
});

export default class Auth {

  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);

  }

  login() {
    // Call the show method to display the widget.
    lock.show();
  }

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    lock.on('authenticated', this.setSession);
    // Add a callback for Lock's `authorization_error` event
    lock.on('authorization_error', (err) => {
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
      history.replace('/login');
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      lock.getUserInfo(authResult.accessToken, function(err, profile) {
        if (err) {
          console.log(err);
        }
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('idToken', authResult.idToken);
        // navigate to the home route
        history.replace('/dashboard');
      });

    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    // navigate to the home route
    history.replace('/login');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    return (!!localStorage.getItem('accessToken') && !!localStorage.getItem('idToken'));
  }
}
