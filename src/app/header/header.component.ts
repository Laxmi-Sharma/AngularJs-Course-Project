import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'aap-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    userSub:Subscription;
 constructor(private dataStorageService : DataStorageService,private authService : AuthService){}
    
     ngOnInit(){
        this.userSub =  this.authService.user.subscribe(user =>{
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
         });
         
     }

     ngOnDestroy(){
         this.userSub.unsubscribe();
     }
     
     onDataSave(){
        this.dataStorageService.storeRecipies();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipies().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}