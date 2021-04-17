import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;
  password: string;
  title = 'LoginAssessment';
  isSignedIn = false;
  enableForgotPassword = false;
  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
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
    alert('signout home');
    this.authenticationService.SignOut();
    this.isSignedIn = false;
  }

  forgotPasswordLink() {
    this.enableForgotPassword = true;
  }

  forgotPassword(email) {

    this.authenticationService.forgottPassword(email);
    this.enableForgotPassword = false;
  }
  showMessage() {
    this.errorMessage = this.authenticationService.getErrorMessage();
  }

}
