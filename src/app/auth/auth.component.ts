import { CustomMessageService } from './../shared/custom-message.service';
import { UserService } from './../shared/user/user.service';
import { Component, OnDestroy, ViewChild, inject } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from "./auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { AuthInterface } from "./auth.interface";
import { UserInterface } from '../shared/user/user.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrl: "./auth.component.css"
})
export class AuthComponent implements OnDestroy{

    @ViewChild("form") formElement: NgForm;

    authService = inject(AuthService);
    userService = inject(UserService);
    customMessageService = inject(CustomMessageService);
    MessageService = inject(MessageService);
    router = inject(Router)
    username: string;
    password: string;
    role: string;
    loginSubscription: Subscription;
    profileSubscription: Subscription;
    
    onLogin() {

        if (!this.formElement.valid)   return;

        this.username = this.formElement.value.username;
        this.password = this.formElement.value.password;
        this.role = this.userService.getRole();
        
        this.loginSubscription= 
        this.authService.login(this.username, this.password)
        .subscribe({
            next: (resData: SuccessResponseInterface<AuthInterface>) => {
                sessionStorage.setItem("access_token", resData.data[0].access_token);
                sessionStorage.setItem("refresh_token", resData.data[0].refresh_token);
                this.getUser();
                this.customMessageService.displayToast(
                    "success", 
                    "Success", 
                    resData.message
                );
                if (this.role === "admin")  this.router.navigate(["employees"]);
                else this.router.navigate(["customers"])
                
                
            },
            error: (errorRes: HttpErrorResponse) => {
                this.customMessageService.displayToast(
                    "error", 
                    "Error", 
                    errorRes.error.message
                );
            }
        });
    }

    getUser() {
        this.profileSubscription=
        this.userService.getUserProfile().subscribe({
            next: (resData: SuccessResponseInterface<UserInterface>) => {
                sessionStorage.setItem("user", JSON.stringify(resData.data[0]));
            },
            error: (errorRes: HttpErrorResponse) => {
                this.customMessageService.displayToast(
                    "error", 
                    "Error", 
                    errorRes.error.message
                );
            }
        })
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.profileSubscription.unsubscribe();
    }
}