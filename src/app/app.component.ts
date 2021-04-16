import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoginAssessment';
  constructor(
    private authenticationService:AuthenticationService
    ){ }

    email: string;
password: string;

signUp() {
this.authenticationService.SignUp(this.email, this.password);
this.email = '';
this.password = '';
}

signIn() {
this.authenticationService.SignIn(this.email, this.password);
this.email = '';
this.password = '';
}

signOut() {
this.authenticationService.SignOut();
}
}
