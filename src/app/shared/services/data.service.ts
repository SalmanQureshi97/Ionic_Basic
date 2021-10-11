import { Injectable } from '@angular/core';
import { UserOptions } from '../interfaces/user-options';

import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(public storage: Storage) {}

  clear() {
    this.storage.clear();
  }

  hasFavorite(sessionName: string): boolean {
    return this.favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
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
}
