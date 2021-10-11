import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/shared/interfaces/user-options';
import { passwordStrength } from 'check-password-strength';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  label = 'danger';
  change = false;
  strength = 'Too weak';
  strengthValue = 0;
  strengthCheck = ['lowercase', 'uppercase', 'number', 'symbol'];
  signup: UserOptions = { username: '', password: '', email: '', imgPath: '' };
  submitted = false;
  password;

  constructor(public router: Router, public userData: DataService) {}

  ngOnInit() {
    this.userData.checkAll().then((data) => {
      console.log(data);
      data.forEach((item) => {
        this.userData.get(item).then((itemData) => {
          console.log(itemData);
        });
      });
    });

    // this.plt.ready().then(() => {
    //   this.loadStoredImages();
    // });
  }

  passwordChange(form: NgForm) {
    this.change = true;

    this.strength = passwordStrength(form.value.password).value;
    if (this.strength == 'Medium' || this.strength == 'Strong') {
      this.label = 'success';
    } else {
      this.label = 'danger';
    }

    if (this.strength == 'Too weak') {
      this.strengthValue = 0.125;
    } else if (this.strength == 'Weak') {
      this.strengthValue = 0.25;
    } else if (this.strength == 'Medium') {
      this.strengthValue = 0.5;
    } else {
      this.strengthValue = 1;
    }
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (this.strengthValue >= 0.25) {
      this.userData.signup(form.value);
      this.router.navigateByUrl('/home');
    }

    // if (form.valid) {
    //   this.userData.signup(this.signup.username);
    //   this.router.navigateByUrl("/app/tabs/schedule");
    // }
  }

  routeToLogin() {
    this.router.navigateByUrl('/login');
  }
}
