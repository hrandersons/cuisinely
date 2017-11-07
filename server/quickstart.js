// var fs = require('fs');
// var readline = require('readline');
// var google = require('googleapis');
// var googleAuth = require('google-auth-library');
// var path = require('path');
// var request = require('request')
// ;
// // var auth = require('../client/Auth/Auth.js');
// // If modifying these scopes, delete your previously saved credentials
// // at ~/.credentials/calendar-nodejs-quickstart.json
// var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// // Load client secrets from a local file.
// fs.readFile(path.join(__dirname, './client_secret.json'), function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Google Calendar API.
//   authorize(JSON.parse(content), listEvents);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   var clientSecret = credentials.web.client_secret;
//   var clientId = credentials.web.client_id;
//   var redirectUrl = credentials.web.redirect_uris[0];
//   var auth = new googleAuth();
//   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//       //console.log('Token --> ',token);
//       oauth2Client.credentials = JSON.parse(token);
//       callback(oauth2Client);
//     }
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
//  */
// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//   console.log('Authorize this app by visiting this url: ', authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   // let token = 'VAuIqE4wY3cTyCjwNaBQA3wabN7VX6N3';
//   // oauth2Client.credentials =  token;
//   //      storeToken(token);
//   //     callback(oauth2Client);
//   // rl.question('Enter the code from that page here: ', function(code) {
//   //   rl.close();
//   //   oauth2Client.getToken(code, function(err, token) {
//   //     console.log('Token ----> ',token);
//   //     if (err) {
//   //       console.log('Error while trying to retrieve access token', err);
//   //       return;
//   //     }

//   //     oauth2Client.credentials = token;
//   //     storeToken(token);
//   //     callback(oauth2Client);
//   //   });
//   // });


//   var options = { method: 'POST',
//     url: 'https://ifeedme.auth0.com/oauth/token',
//     headers: { 'content-type': 'application/json' },
//     body: 
//    { grant_type: 'client_credentials',
//      client_id: 'sNfZXyIkcjg3QZve68HJXoGfzFVZgjE4',
//      client_secret: 'VVT-Rgf_hedkjZMgTBmhTcZNg2w4p56j01tUJ0Dp0l3cPfb7u-2oEUmoWQ6dWKVf',
//      audience: 'https://ifeedme.auth0.com/api/v2/' },
//     json: true };

//   request(options, function (error, response, body) {
//     if (error) { throw new Error(error); }
//     console.log('Error ---> ', error);
//     console.log('Body  ---> ', body);
//   });
// }

// /**
//  * Store token to disk be used in later program executions.
//  *
//  * @param {Object} token The token to store to disk.
//  */
// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('Token stored to ' + TOKEN_PATH);
// }

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listEvents(auth) {
//   //auth.credentials = 'VAuIqE4wY3cTyCjwNaBQA3wabN7VX6N3';

// var options = { method: 'GET',
//   url: 'https://ifee.auth0.com/api/v2/users/google-oauth2|107116882266556314730',
//   headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFURTBSVUUwTkRaQ01VVTBNRGxGTWpkRFJqTkNSVVkxT0VRMFFrWTNRMFl5UVRORFFrRXdRZyJ9.eyJpc3MiOiJodHRwczovL2lmZWUuYXV0aDAuY29tLyIsInN1YiI6Im4zZlF3bUNHUVdYWnlSMHJjcUpHMUREZWhaelJXSzJMQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2lmZWUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1MDk5ODQyMTEsImV4cCI6MTUxMDA3MDYxMSwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.I7hSmXmjtPa8IUt_o0d0TVqOd50QYagk5CYG4GT_NAv2MzmBOrwlD4jaB5WLKUYEfCa0K2cifTSd5eIErqsbRzv9rMm6vbZzn_mDwQJikPcCII7tx1ctp0ALaTyAAa7U6XGG7mggTsNpXazwKo4Fw4A5I4_I301LcCNPkJAuZEwpq_465k1p76-OH6sE9gQz-moOBDOZD3a3LdhwZ_AHld_j2BBOXmRMa8oyj4oSoTpPTjRKhMRwKmeBRFhrer5u8gWhRIyf4B8jIRus7AU_gWnepqTY_0FSOKsub-J7_KBCfGLfrCzgUX9gs7bKChLxYtW7nSDq63YW5RrHnKuTmg' },
//   params: access_type='offline'}

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(JSON.parse(body));
//   let user = JSON.parse(body)
//    // auth.credentials = user.identities[0].access_token;
//    // auth._clientId = user.identities[0].user_id;
//   auth = oauth2Client.setCredentials({
//   access_token: user.identities[0].access_token
// });
//   var calendar = google.calendar('v3');
//   calendar.events.list({
//    // auth: auth,
//    auth: auth,
//     calendarId: 'primary',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime'
//   }, function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var events = response.items;
//     if (events.length == 0) {
//       console.log('No upcoming events found.');
//     } else {
//       console.log('Upcoming 10 events:');
//       for (var i = 0; i < events.length; i++) {
//         var event = events[i];
//         var start = event.start.dateTime || event.start.date;
//         console.log('%s - %s', start, event.summary);
//       }
//     }
//   });

// });


// }