import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PromptComponent } from '../prompt/prompt.component';
const SERVER_URL = 'https://nodejsangular2022.herokuapp.com/sendNotification'
@Injectable({
  providedIn: 'any'
})
export class ApiServiceService {
  private promptEvent: any;
  constructor(private http:HttpClient,private platform: Platform, private bottomSheet: MatBottomSheet) { }
  call_api(api_name:any,dt:any,_flag:number){
    if(_flag > 0){
      //Post
      return this.http.post(environment.api_url+api_name,dt);
    }
    else{
      //Get
      var api_dt = dt ? '?' + dt : '';
      return this.http.get(environment.api_url+api_name + api_dt);
    }

  }

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log('sss');

    return this.http.post(SERVER_URL, subscription)
  }

}
