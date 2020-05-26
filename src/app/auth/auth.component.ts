import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy, OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription;
    private storeSub :Subscription;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    constructor(private authService: AuthService,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private componentFactory: ComponentFactoryResolver) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnInit() {
       this.storeSub =  this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if(this.error){
                this.showErrorAlert(this.error);
            }
        });
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if (this.storeSub) {
        this.storeSub.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        
        this.isLoading = true;
        if (this.isLoginMode) {
            //authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
        } else {
            //authObs = this.authService.signUp(email, password);
            this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }))
        }
        form.reset();
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(errorMessage: string) {
        //const alertComponent = new AlertComponent(); //will not create a component. we need component factory
        const alertComponentFactory = this.componentFactory.resolveComponentFactory(AlertComponent);
        //to show where we need to add this component , we need a view contaire ref. We can create helper directive
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear(); //its not just an object. its allow you to interact with that place in the dom
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}