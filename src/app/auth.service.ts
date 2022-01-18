import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_Decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';




 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentuser=new BehaviorSubject(null)
  
   baseurl:string="https://routeegypt.herokuapp.com/"


  constructor(private _HttpClient:HttpClient,private _Router:Router) { 
    if(localStorage.getItem(`token`))
    {
      this.saverCurrentUser()
    }
  }

registerService(data:object):Observable<any>
{
  return this._HttpClient.post(this.baseurl+`signup`,data)
}
loginservice(data:object):Observable<any>
{
  return this._HttpClient.post(this.baseurl+`signin`,data)
}

saverCurrentUser()
{
  let token :any= JSON.stringify(localStorage.getItem(`token`)) 
  let decoded :any= jwt_Decode(token)
  this.currentuser.next(decoded)
  console.log(this.currentuser.value)
 
}

logout()
{
  localStorage.removeItem(`token`);
  this.currentuser.next(null);
  this._Router.navigate([`/login`])
}


}
