import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CustomMessageService } from "../shared/custom-message.service";
 
export const authGuard: CanActivateFn = (route, state) => {
    const token = sessionStorage.getItem('access_token');
    const router = inject(Router);
    const customMessageService = inject(CustomMessageService);

    if(token){
        return true;
    }
    else{
        customMessageService.displayToast(
            "error",
            "Error",
            "Please login to continue"
        )
        router.navigate(['/login']);
        return false;
    }
}