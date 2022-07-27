import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from '../main/main.component';


const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'login/:id',component:LoginComponent}
];
@NgModule({
  declarations: [
    LoginComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports:[RouterModule]
})
export class LoginModule {
  constructor(){
    console.log('loaded');

  }

 }
