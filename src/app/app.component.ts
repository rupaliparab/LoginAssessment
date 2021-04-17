import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  email: string;
password: string;
  title = 'LoginAssessment';
  isSignedIn = false;
  constructor(
    private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
      if (localStorage.getItem('user') !== null) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    }

signUp() {
this.authenticationService.SignUp(this.email, this.password);
if (this.authenticationService.isLoggedIn) {
  this.isSignedIn = true;
  }
this.email = '';
this.password = '';
}

signIn() {
this.authenticationService.SignIn(this.email, this.password);
if (this.authenticationService.isLoggedIn) {
this.isSignedIn = true;
}
this.email = '';
this.password = '';
}

signOut() {
this.isSignedIn = false;
this.authenticationService.SignOut();
}


}
