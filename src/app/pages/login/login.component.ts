import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar,private login:LoginService, public router:Router) { }

  ngOnInit(): void {
    if(this.login.isLoggedIn() && this.login.getUserRole()=="Admin"){
      this.router.navigateByUrl('/admin-dashboard');
    }
    else if(this.login.isLoggedIn() && this.login.getUserRole()=="Customer"){
      this.router.navigateByUrl('/user-dashboard');
    }
  }
  formSubmit() {
    console.log('login btn clicked')

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this.snack.open('Username is required !!','',{
        duration: 3000,
      });
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open('Password is required !!','',{
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(user =>{
          this.login.setUser(user);
          console.log(user);

          // redirect if ADMIN: admin page
          if(this.login.getUserRole() == 'Admin'){

            this.router.navigateByUrl('/admin-dashboard');
            this.login.loginStatus.next(true);

          }
          //redirect if USER: user page
          else if(this.login.getUserRole() == 'Customer'){

            this.router.navigateByUrl('/user-dashboard');
             this.login.loginStatus.next(true);

          }else{
            this.login.logout();
          }



        }, error =>{
          console.log("error");
        })
      },
      (error)=>{
        console.log('Error !');
        console.log(error);
        this.snack.open("Invalid Credentials",'',{duration : 3000});
      }
    );
  }
}
