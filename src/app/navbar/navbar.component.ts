import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isloged:boolean=false

  constructor(private _AuthService:AuthService) {
    
   }

  ngOnInit(): void {

    this._AuthService.currentuser.subscribe(()=>{
      if(this._AuthService.currentuser.getValue()!=null)
    {
      
         this.isloged=true
        
    }
    else
    {
      this.isloged=false
    
    }
    })

  }


  out()
  {
    this._AuthService.logout()
  }

}
