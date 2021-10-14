import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/shared/interfaces/user-options';
import { DataService } from 'src/app/shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: UserOptions = { username: '', password: '', email: '', imgPath: '' };
  submitted = false;
  notMatching = true;
  language = 'English';
  title = 'Login';
  lang = 'Langauge';
  Username = 'Username';
  Password = 'Password';
  Login = 'Login';
  Signup = 'Signup';

  constructor(
    public userData: DataService,
    public router: Router,
    private _translate: TranslateService
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData
        .checkValidLoginInfo(form.value.username, form.value.password)
        .then((value) => {
          if (value) {
            this.router.navigateByUrl('/home');
          } else {
            this.notMatching = false;
          }
        });
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  //performs translation when langauge changed
  changeLanguage(value) {
    this.language = value.detail.value;
    this._translateLanguage();
  }

  // localization module
  _translateLanguage(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  //localization module
  _initialiseTranslation(): void {
    this._translate.get('Page').subscribe((res: string) => {
      this.title = res;
    });
    this._translate.get('Username').subscribe((res: string) => {
      this.Username = res;
    });
    this._translate.get('Password').subscribe((res: string) => {
      this.Password = res;
    });
    this._translate.get('Login').subscribe((res: string) => {
      this.Login = res;
    });
    this._translate.get('Signup').subscribe((res: string) => {
      this.Signup = res;
    });
    this._translate.get('language').subscribe((res: string) => {
      this.lang = res;
    });
  }
}
