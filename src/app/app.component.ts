import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    localStorage.setItem('_route',this.route.snapshot.params.id);
  }
  title = 'angular-pwa';


}
