import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/shared/interfaces/user-options';
import { passwordStrength } from 'check-password-strength';
import { DataService } from 'src/app/shared/services/data.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  form;

  ionicForm: FormGroup;
  defaultDate = '1987-06-30';
  isSubmitted = false;

  constructor(
    public router: Router,
    public userData: DataService,
    private firebaseAuthentication: FirebaseAuthentication,
    public fire: AngularFireAuth,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    ////////REACTIVE /////////////
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    //////////////////////////////
    this.form = new FormControl('');

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
    // this.firebaseAuthentication
    //   .createUserWithEmailAndPassword(form.value.email, form.value.password)
    //   .then(
    //     (data) => {
    //       console.log(data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    console.log(form.value.email, form.value.password);
    //Sfirebase.auth.createUserWithEmailAndPassword("my@mail.com", "pa55w0rd");
    // this.firebaseAuthentication
    //   .createUserWithEmailAndPassword(form.value.email, form.value.password)
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.error(error));
    // this.fire.auth
    //   .createUserWithEmailAndPassword(form.value.email, form.value.password)
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.log(error));

    this.submitted = true;
    // if (this.strengthValue >= 0.25) {
    //   this.userData.signup(form.value);
    //   this.router.navigateByUrl('/home');
    // }

    // if (form.valid) {
    //   this.userData.signup(this.signup.username);
    //   this.router.navigateByUrl("/app/tabs/schedule");
    // }
  }

  routeToLogin() {
    this.router.navigateByUrl('/login');
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
    }
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true,
    });
  }
}
