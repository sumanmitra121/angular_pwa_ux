import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _service:ApiServiceService,private router : Router) { }
  employee:any=[];
  ngOnInit(): void {this.fetchIncidentLists();}
  fetchIncidentLists(){
    this._service.call_api('/employee','flag=A',0).pipe(map((x:any) => x.msg)).subscribe(data=>{
      this.employee=data;
    })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
