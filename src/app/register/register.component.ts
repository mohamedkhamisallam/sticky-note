import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


declare let $:any 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  isRegister:boolean=false;
  messagesuccess:boolean=false;
  errorMessage:boolean=false

  constructor(private _AuthService:AuthService) { 
   
  }

  ngOnInit(): void {
    

    $('#register').particleground();
  }



  registerForm:FormGroup= new FormGroup({

 first_name:new FormControl(``,[Validators.required,Validators.minLength(3),Validators.maxLength(13)]),
 last_name:new FormControl(``,[Validators.required,Validators.minLength(3),Validators.maxLength(13)]),
 email:new FormControl(``,[Validators.required,Validators.email]),
 age:new FormControl(``,[Validators.required,Validators.min(18),Validators.max(100)]),
 password:new FormControl(``,[Validators.required,Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$`)])

  })

  registerFunction(data:any)
  {

    this.isRegister=true
    console.log(data);
    this._AuthService.registerService(data.value).subscribe((response)=>{
        console.log(response)

            this.isRegister=true
        if(response.message==`success`)
        {
          
             this.isRegister=false
             this.messagesuccess=true
             this.errorMessage=false
        }
        else{

         
              this.isRegister=false 
              this.messagesuccess=false 
              this.errorMessage=true
              
        }
    })
  }


}
