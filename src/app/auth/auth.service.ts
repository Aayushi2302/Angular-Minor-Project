import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { AuthInterface } from "./auth.interface";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    httpClient = inject(HttpClient);

    login(inputUsername: string, inputPassword: string){
        const loginUrl = environment.apiUrl + "/v1/login";
        return  this.httpClient.post<SuccessResponseInterface<AuthInterface>>(
                    loginUrl, 
                    {
                        username: inputUsername,
                        password: inputPassword
                    }
                );
    }

    logout() {
        const logoutUrl = environment.apiUrl + "/v1/logout";
        sessionStorage.clear();
        this.httpClient.post<SuccessResponseInterface<any>>(
            logoutUrl,
            {}
        )
    }
}