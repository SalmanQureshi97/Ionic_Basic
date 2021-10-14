import { Injectable } from '@angular/core';
import { UserOptions } from '../interfaces/user-options';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage,
    private http: HTTP,
    private webHttp: HttpClient,
    public platform: Platform
  ) {}

  clear() {
    this.storage.clear();
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(data: UserOptions) {
    let dat = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

    let users = [];
    this.storage.get('users').then((itemData) => {
      if (itemData) {
        itemData.push(data);
        return this.storage.set('users', itemData).then(() => {
          this.setUsername(dat.username);
          this.login(dat.username);
          return window.dispatchEvent(new CustomEvent('user:signup'));
        });
      } else {
        users.push(data);
        return this.storage.set('users', users).then(() => {
          this.setUsername(dat.username);
          this.login(dat.username);
          return window.dispatchEvent(new CustomEvent('user:signup'));
        });
      }
    });
  }

  logout(): Promise<any> {
    return this.storage
      .remove(this.HAS_LOGGED_IN)
      .then(() => {
        return this.storage.remove('username');
      })
      .then(() => {
        window.dispatchEvent(new CustomEvent('user:logout'));
      });
  }

  get(key: string) {
    return this.storage.get(key);
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  changeUsername(username, currUsername) {
    var elem;
    var users;
    return this.storage.get('users').then((itemData) => {
      users = itemData;
      users = users.filter((item) => item.username != currUsername);
      itemData.forEach((element) => {
        if (element.username === currUsername) {
          element.username = username;
          this.storage.set('users', itemData);
          this.setUsername(username);
          return true;
        }
      });
    });
  }

  changePassword(currPassword, newPassword, username) {
    console.log(currPassword, newPassword, username);
    var returner = false;
    var users;
    return this.storage.get('users').then((itemData) => {
      users = itemData;
      users = users.filter((item) => item.username != username);
      itemData.forEach((element) => {
        if (
          element.username === username &&
          element.password === currPassword
        ) {
          element.password = newPassword;
          this.storage.set('users', itemData);
          console.log('WOW CHANGED');
          returner = true;
        }
      });
      return returner;
    });
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  checkAll() {
    return this.storage.keys();
  }

  checkValidLoginInfo(username: string, pass: string) {
    var checker = false;
    return this.storage.get('users').then((data) => {
      data.forEach((element) => {
        if (element.username === username && element.password === pass) {
          checker = true;
          this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
            this.setUsername(username);
            window.dispatchEvent(new CustomEvent('user:login'));
          });
        }
      });
      if (checker) {
        return true;
      } else {
        return false;
      }
    });
  }

  getAllUsers() {
    return this.storage.get('users').then((data) => {
      return data;
    });
  }

  getUser(username) {
    var user;
    return this.storage.get('users').then((data) => {
      data.forEach((element) => {
        if (element.username === username) {
          user = element;
        }
      });
      return user;
    });
  }

  API_getUsers() {
    this.platform.ready().then(() => {
      if (
        this.platform.platforms().indexOf('mobileweb') >= 0 ||
        (this.platform.platforms().indexOf('desktop') >= 0 &&
          this.platform.platforms().indexOf('android') == -1 &&
          this.platform.platforms().indexOf('ios') == -1)
      ) {
        console.log('REQUEST VIA WEB');
        let url =
          environment.baseUrl +
          environment.basePort +
          environment.listUsers_Url;
        // this.webHttp.get(url).subscribe((data) => {
        //   console.log(data);
        // });
        this.getDetails(url).subscribe((data) => {
          console.log(data);
        });
      } else {
        let url =
          environment.baseUrlEmulator +
          environment.basePort +
          environment.listUsers_Url;

        console.log('REQUEST VIA APP', url);
        // this.http
        //   .get(url, {}, {})
        //   .then((data) => {
        //     console.log('DATA', data.data);
        //   })
        //   .catch((error) => {
        //     console.log('ERROR', error);
        //   });
        this.getDetails(url).subscribe((data) => {
          console.log(data);
        });
      }
    });

    // if (
    //   !document.URL.startsWith('http') ||
    //   document.URL.startsWith('http://localhost:8080')
    // ) {
    //   console.log('REQUEST VIA APP');
    //
    // } else {
    //   console.log('REQUEST VIA WEB');
    //   this.webHttp.get(url).subscribe((data) => {
    //     console.log(data);
    //   });
    // }
  }

  getDetails(url): Observable<any> {
    return this.webHttp.get(url, {}).pipe(
      tap((_) => console.log('response received')),
      catchError(this.handleError('getDetails', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
