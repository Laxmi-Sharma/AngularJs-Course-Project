import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector:'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode=true;
    isLoading = false;
    error: string = null;
    private closeSub : Subscription;
    @ViewChild(PlaceholderDirective, {static:false}) alertHost : PlaceholderDirective;

    constructor(private authService:AuthService, private router: Router, private componentFactory: ComponentFactoryResolver){}

    onSwitchMode(){
    this.isLoginMode= !this.isLoginMode;
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    onSubmit(form:NgForm){
        if(!form.valid){
            return ;
        }
        const email = form.value.email;
        const password = form.value.password; 
        let authObs :Observable<AuthResponseData>;
        this.isLoading=true;
        if(this.isLoginMode){
       authObs= this.authService.login(email,password);
        }else{
        authObs = this.authService.signUp(email,password);
        }
        authObs.subscribe(resData =>{
            console.log(resData)
            this.isLoading=false;
            this.router.navigate(['/recipes']);
        }, errorMessage =>{
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading=false;
            
        })
         form.reset();   
    }

    onHandleError(){
        this.error=null;
    }

    private showErrorAlert(errorMessage:string){
        //const alertComponent = new AlertComponent(); //will not create a component. we need component factory
        const alertComponentFactory = this.componentFactory.resolveComponentFactory(AlertComponent);
        //to show where we need to add this component , we need a view contaire ref. We can create helper directive
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear(); //its not just an object. its allow you to interact with that place in the dom
       const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() =>{
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}