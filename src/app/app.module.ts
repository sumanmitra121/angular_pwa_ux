import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApiServiceService } from './service/api-service.service';
import { OverlayModule } from "@angular/cdk/overlay";
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
const initializer = (pwaService: ApiServiceService) => () => pwaService.initPwaPrompt();
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
      { provide: MatBottomSheet },
      { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
      {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [ApiServiceService], multi: true}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
