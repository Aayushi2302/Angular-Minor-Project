import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./user.interface";
import { environment } from '../../../environments/environment';
import { SuccessResponseInterface } from '../success-response.interface';

@Injectable({
    providedIn: "root"
})
export class UserService {
    httpClient = inject(HttpClient);

    getUserProfile() {
        const userProfileUrl = environment.apiUrl + "/v1/my-profile";
        return this.httpClient.get<SuccessResponseInterface<UserInterface>>(
            userProfileUrl
        );
    }

    getRole(){
        let userProfile = JSON.parse(sessionStorage.getItem("user"));
        return userProfile.role;
    }

    getName() {
        let userProfile = JSON.parse(sessionStorage.getItem("user"));
        return userProfile.name;
    }
}
