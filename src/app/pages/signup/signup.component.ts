import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { analyze } from 'eslint-scope';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar, private login: LoginService, private router: Router ) { }


  public user = {
    username: '',
    password: '',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
    if(this.login.isLoggedIn() && this.login.getUserRole()=="Admin"){
      this.router.navigateByUrl('/admin-dashboard');
    }
    else if(this.login.isLoggedIn() && this.login.getUserRole()=="Customer"){
      this.router.navigateByUrl('/user-dashboard');
    }
  }

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null)
    {
      //alert('User is required !!');
      this.snack.open('Username is required !! ','',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      });
      return;
    }

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        //alert('success');
        Swal.fire('Successfully done','User Registered. User ID is ' + data.id,'success');
      },
      (error)=>{
        //error
        console.log(error);
        //alert('something went wrong');
        this.snack.open('something went wrong !!','',{
          duration:3000,
        })
      }
    )


  }
  //this.user

}
