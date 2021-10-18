// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:',
  baseUrlEmulator: 'http://10.0.2.2:',
  basePort: '8081/',

  listUsers_Url: 'listUsers',
  addUsers_Url: 'addUsers',
  updateUser_Url: 'updateUser',
  deleteUser_Url: 'deleteUser',

  firebaseConfig: {
    apiKey: 'AIzaSyCSN8YZxnrl2GwbGJQoCri3sR1mbVnNIdk',
    authDomain: 'ionic-8d1c1.firebaseapp.com',
    projectId: 'ionic-8d1c1',
    storageBucket: 'ionic-8d1c1.appspot.com',
    messagingSenderId: '873999448654',
    appId: '1:873999448654:web:41969f5572d7cf2539611f',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
