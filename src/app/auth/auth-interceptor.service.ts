import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { RefreshTokenService } from "../shared/refresh_token/refresh-token.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    refreshTokenService = inject(RefreshTokenService);
    authService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let loginUrl = environment.apiUrl + "/v1/login";
        if (req.url === loginUrl){
            return next.handle(req);
        }

        const userToken = sessionStorage.getItem("access_token");
        const modifiedReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${userToken}`)
        })
        return next.handle(modifiedReq).pipe(catchError(err => {
            
            if (err.error.error === "Token Expired"){
                // this.refreshTokenService.getNewAccessToken();
                this.authService.logout();
            }

            return throwError(() => err);
        }));
    }
}