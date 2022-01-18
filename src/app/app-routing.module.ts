import { registerLocaleData } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
   {path:``,redirectTo:`login`,pathMatch:`full`},
  {path:`login`,component:LoginComponent},
  {path:`register`,component:RegisterComponent},
  {path:`home`,component:HomeComponent},
  {path:`**`,component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
