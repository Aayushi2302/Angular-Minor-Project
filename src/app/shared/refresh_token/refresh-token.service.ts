import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { environment } from '../../../environments/environment';
import { SuccessResponseInterface } from '../success-response.interface';
import { RefreshTokenInterface } from './refresh-token.interface';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class RefreshTokenService {

    httpClient = inject(HttpClient);
    counter = 1;

    getNewAccessToken() {
        const refreshToken = sessionStorage.getItem("refresh_token");

        if (!refreshToken) return;

        const refreshTokenUrl = environment.apiUrl + "/v1/refresh";
        // this.httpClient.post(
        //     refreshTokenUrl,
        //     {},
        //     {headers: {"Authorization": `Bearer ${refreshToken}`}}
        // ).pipe(take(1)).subscribe({
        //     next: (resData: SuccessResponseInterface<RefreshTokenInterface>) => {
        //         console.log(resData);
        //     },
        //     error: (errRes: HttpErrorResponse) => {
        //         console.log(errRes);
        //         console.log("Refresh request sent : ", this.counter);
        //         this.counter++;
        //     }
        // });
    }
}