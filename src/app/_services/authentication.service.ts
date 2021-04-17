import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  errorMessage: string ;
 // userData: Observable<firebase.loginassessment>;

  constructor(private angularFireAuth: AngularFireAuth) {
  //  this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  async SignUp(email: string, password: string) {
   await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        console.log('You are Successfully signed up!');
      })
      .catch(error => {
        this.isLoggedIn = false;
        this.setErrorMessage(error.message);
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
 async SignIn(email: string, password: string) {
  await  this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(error => {
        this.isLoggedIn = false;
        this.setErrorMessage(error.message);
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
  }

  setErrorMessage(val: string ) {
    console.log('val: ', val);
    this.errorMessage = val;
  }

  getErrorMessage(): string {
    console.log(this.errorMessage);
    return this.errorMessage;
  }

}
