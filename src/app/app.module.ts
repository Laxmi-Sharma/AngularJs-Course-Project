import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import { StoreModule } from '@ngrx/store';
import *as fromRoot from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
       
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromRoot.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    CoreModule, 
    
  ],
  bootstrap: [AppComponent],
  // providers:[LoggingService]
})
export class AppModule { }
