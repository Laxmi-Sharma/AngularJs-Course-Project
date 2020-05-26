import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private store:Store<fromRoot.AppState>,
    private loggingService:LoggingService){}
   
  ngOnInit(){
    //this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog("Hello from App Component !");
 }
}
