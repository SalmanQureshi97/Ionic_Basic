import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/shared/interfaces/user-options';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: UserOptions = { username: '', password: '', email: '', imgPath: '' };
  submitted = false;
  notMatching = true;

  constructor(public userData: DataService, public router: Router) {}

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
}
