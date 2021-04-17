import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetails: any;
  email: string;
  password: string;
  isSignedIn = false;
  @Output() isLogout = new EventEmitter<void>();
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    console.log(this.userDetails);
  }

  logOut() {
    alert('signout log');
    this.authenticationService.SignOut();
    this.isLogout.emit();
  }
}
