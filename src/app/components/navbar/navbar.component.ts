import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;

  constructor(public login: LoginService, public router: Router) { }

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatus.asObservable().subscribe(status => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    })
  }

  logout(){
    this.login.logout();
    this.isLoggedIn = false;
    this.user= null;
    this.router.navigate(['/']);
  }
}
