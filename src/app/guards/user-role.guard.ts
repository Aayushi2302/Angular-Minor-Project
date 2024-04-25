import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { CustomMessageService } from "../shared/custom-message.service";
  
export function allowedUsers (...roles: string[]): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 
        const role = JSON.parse(sessionStorage.getItem('user')).role;
        const router = inject(Router)
        const customMessageService = inject(CustomMessageService);
 
        if(roles.includes(role)){
            return true;
        }
        else{
            customMessageService.displayToast(
                'error',
                'Error',
                'You have no permission to access this route'
            );
            router.navigate(['/login']);
            return false;
        }
    }
}