import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { ApiServiceService } from './service/api-service.service';

const VAPID_PUBLIC = 'BC1xWoyd37ruDIK4zaOpcB4sm8qbsfsZI3usKMgSNZsfA9y6JjLMDxdFnGCjIqwKF54JHTHxEhj5RufBoZr1CLI';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public route:ActivatedRoute,private swpush: SwPush,private update:SwUpdate,private snackbar:MatSnackBar,private service:ApiServiceService){

      // this.update.available.subscribe( res =>{
      //  const snackbar = this.snackbar.open('Update Available','Reload');
      //  snackbar.onAction().subscribe(() =>{
      //    window.location.reload();
      //  })
      // })
      // this.swpush.messages.subscribe(res => {
      //  this.snackbar.open(JSON.stringify(res));
      // })
      // const key =  'BNX00n0lS2p96w-mHRzx5PkEsGUvSS-w9DYSdpxZNadyyq-CkkkjphKt0dif1-kBEpJxXwwaX7gR4M5Kpbhfr6I';
      // if(this.swpush.isEnabled){
      //   this.swpush.requestSubscription({serverPublicKey:key}).then(pushSubscription =>{
      //     // console.log(pushSubscription.toJSON());
      //     this.service.sendSubscriptionToTheServer(pushSubscription).subscribe();


      //   })
      // }

      if (this.swpush.isEnabled) {
        this.swpush
          .requestSubscription({
            serverPublicKey: VAPID_PUBLIC
          })
          .then(subscription => {
            this.service.sendSubscriptionToTheServer(subscription).subscribe();
          })
          .catch(console.error);
      }
    }
  ngOnInit(): void {
    localStorage.setItem('_route',this.route.snapshot.params.id);
  }
  title = 'angular-pwa';

}
