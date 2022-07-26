import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  _check_response:any;
  constructor(private _snackBar: MatSnackBar,private _service:ApiServiceService,private fb:FormBuilder,private router:Router,private spinner:NgxSpinnerService) { }
  logForm!:FormGroup;
  ngOnInit(): void {
    this.logForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]

    })
  }
  submit(){
    this.spinner.show();
    this._service.call_api('/login',this.logForm.value,1).subscribe(data=>{
      this._check_response= data;
      if(this._check_response.suc==1){
        localStorage.setItem('Email',this._check_response.msg[0].email);
        localStorage.setItem('Employee_id',this._check_response.msg[0].employee_id);
        if(this._check_response.msg[0].first_login > 0){
        localStorage.setItem('Emp_name',this._check_response.msg[0].emp_name);
        localStorage.setItem('Emp_status',this._check_response.msg[0].emp_status);
        localStorage.setItem('User_type',this._check_response.msg[0].user_type);
        // this.spinner.hide();
        this.router.navigate(['/home']);
        }
        else{
          this._snackBar.open('Wrong Credentials!!', 'oops',{
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
       this.spinner.hide();
      }
      else{
        this.spinner.hide();
        this._snackBar.open('Wrong Credentials!!', 'oops',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
    })

  }
}
