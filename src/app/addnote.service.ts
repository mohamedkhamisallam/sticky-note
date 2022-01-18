import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AddnoteService {

  baseurl:string="https://routeegypt.herokuapp.com/"

  constructor(private _HttpClient:HttpClient) { }
  


  addnoteservice(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseurl+`addNote`,data)
  }


  getallnotes(data:any):Observable<any>
  {
    return  this._HttpClient.post(this.baseurl+`getUserNotes`,data)
  }

editservices(data:any):Observable<any>
{
  return this._HttpClient.put(this.baseurl+`updateNote`,data)
}


deleteservice(data:any):Observable<any>
{


    let option={

      headers:new HttpHeaders({}),
      body:{
        NoteID:data.NoteID,
        token:data.token 
           
      }

    }
  return this._HttpClient.delete(this.baseurl+`deleteNote`,option)
}
}
