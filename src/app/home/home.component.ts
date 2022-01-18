import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddnoteService } from '../addnote.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isnoted:boolean=false
 dataservice:any= ``
 notearray:any[]=[]
 receivenoteid:any
 receivedeleteid:any
  constructor(private _AuthService:AuthService,private _AddnoteService:AddnoteService) {
    
     this.dataservice=this._AuthService.currentuser.getValue()
     console.log(this.dataservice)

  }

  citizenID=``
  token=localStorage.getItem(`token`)

  ngOnInit(): void {


this.getallnotesfunction()
    

  }

//////////////////////////////////////addform////////////////////////
  addnoteform:FormGroup=new FormGroup({

    title:new FormControl(``,[Validators.required]),
    desc:new FormControl(``,[Validators.required])


   })

////////////////////////addfunction////////////////
   addnotefunction(data:any)
   {
        
           
 console.log(data)

      let addobj={
        title:data.value.title,
        desc:data.value.desc,
         citizenID:this.dataservice._id,
         token:this.token
      }
      console.log(addobj)

      this._AddnoteService.addnoteservice(addobj).subscribe((response)=>{

         console.log(response)
          if(response.message==`success`)
          
          {
            this.getallnotesfunction() ;   
            (document.querySelector(`.selector`)as HTMLElement).click()

          }
      })


   }
                ////////////////////getnote function////////////////////////////

              getallnotesfunction()
              {
                let getallobj={
                  token:this.token,
                    userID:this.dataservice._id
                }

                this._AddnoteService.getallnotes(getallobj).subscribe((response)=>{
                  console.log(response)
                  if(response.message==`success`)
                  {
                    this.notearray=response.Notes
                    
                  }
                })

            
              }

              //  edit////////////////////
            edit(data:any)
            {
                console.log(data) 
                this.receivenoteid=data    
            }
              /////////////////////updateform///////////////////


              updateform:FormGroup=new FormGroup({

                title:new FormControl(``,[Validators.required]),
                desc:new FormControl(``,[Validators.required])
            
            
               })


               //////////////////updatemethod////////////////
               updatefunction(data:any)
               {
                    console.log(data.value)
                    let updateobj={
                                token:this.token,
                                title:data.value.title,
                                desc:data.value.desc,
                                NoteID:this.receivenoteid
                               

                    }
                    console.log(updateobj)
                    this._AddnoteService.editservices(updateobj).subscribe((response)=>{
                      console.log(response)
                      if(response.message==`updated`)
                      {
                        this.getallnotesfunction() ;   
                        (document.querySelector(`.selector`)as HTMLElement).click()
                        
                      }
                    })
               }


               setvalue()
               {
                 for (let i = 0; i < this.notearray.length; i++) {
                   
                   if(this.notearray[i]._id==this.receivenoteid)
                   {
                             console.log(this.notearray[i])
                             this.updateform.controls.title.setValue(this.notearray[i].title);
                             this.updateform.controls.desc.setValue(this.notearray[i].desc)

                   }
                 }
               }

//////////////////////////////////////////////////////////////////
                  del(data:any)
                    {
                      this.receivedeleteid=data

                       }


               /////////////////////deletefunction/////////////

               deletefunction()
               {
                 let deleteobj={
                    NoteID:this.receivedeleteid  ,
                    token:this.token
                 }

                 this._AddnoteService.deleteservice(deleteobj).subscribe((response)=>{
                   console.log(response)
                   if(response.message==`deleted`)
                   {
                    this.getallnotesfunction() ; 
                   }
                 })
               }
               













}
