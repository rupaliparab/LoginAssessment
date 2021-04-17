import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  email: string;
  password: string;
  title = 'LoginAssessment';
  isSignedIn = false;
  enableForgotPassword = false;
  errorMessage: string;
  enableShowMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required])
    });

    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.enableShowMessage = false;
    this.submitted = true;
    this.email = this.loginForm.controls.username.value;
    this.password = this.loginForm.controls.password.value;

    if (this.loginForm.invalid) {
      return;
    }
  }
  async signUp() {
    await this.authenticationService.SignUp(this.email, this.password);
    if (this.authenticationService.isLoggedIn) {
      this.isSignedIn = true;
    }
    this.email = '';
    this.password = '';
  }

  async signIn() {
   // alert(this.loginForm.controls.username.value);
    await this.authenticationService.SignIn(this.email, this.password);

    if (this.authenticationService.isLoggedIn) {
      this.isSignedIn = true;
      this.router.navigate(['/login']);
    } else {
      this.showMessage();
    }
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
    this.isSignedIn = false;
  }

  sendEmail() {
    this.enableForgotPassword = true;
  }

  forgotPassword(email) {

    this.authenticationService.forgottPassword(email);
    this.enableForgotPassword = false;
    setTimeout(()=>{
    this.showMessage();
  }, 1000);
  }
  showMessage() {
    this.enableShowMessage = true;
    this.errorMessage = this.authenticationService.getErrorMessage();
  }

}
