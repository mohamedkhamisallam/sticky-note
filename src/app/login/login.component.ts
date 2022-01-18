import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

   declare let $:any


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _Router:Router) { }

  ngOnInit(): void {
    $('#login').particleground();
  }
  loginForm:FormGroup= new FormGroup({

   
    email:new FormControl(``,[Validators.required,Validators.email]),
   
    password:new FormControl(``,[Validators.required,Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$`)])
   
     })

     loginFunction(data:any)
     {
       console.log(data)
       this._AuthService.loginservice(data.value).subscribe((response)=>{
         console.log(response)
         if(response.message==`success`)
         {
             localStorage.setItem(`token`,response.token);
             this._AuthService.saverCurrentUser();
             this._Router.navigate([`/home`])
         }
       })
     }
}
