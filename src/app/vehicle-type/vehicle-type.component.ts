import { UserService } from './../shared/user/user.service';
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { VehicleTypeService } from "./vehicle-type.service";
import { VehicleTypeInterface } from "./vehicle-type.interface";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomMessageService } from '../shared/custom-message.service';

@Component({
    selector: "app-vehicle-type",
    templateUrl: "./vehicle-type.component.html",
    styleUrl: "./vehicle-type.component.css"
})
export class VehicleTypeComponent implements OnInit, OnDestroy{

    vehicleTypes: VehicleTypeInterface[];
    vehicleTypeSubscription: Subscription;
    role: string;
    loading = true;
    vehicleTypeService = inject(VehicleTypeService);
    userService = inject(UserService);
    router = inject(Router);
    activeRoute = inject(ActivatedRoute);
    customMessageService = inject(CustomMessageService);
    
    ngOnInit() {
        this.role = this.userService.getRole();
        this.vehicleTypeSubscription = 
        this.vehicleTypeService.getAllVehicleTypes()
        .subscribe({
            next: (resData: SuccessResponseInterface<VehicleTypeInterface>) => {
                this.vehicleTypes = resData.data;
                setTimeout(()=>{
                    this.loading = false;
                }, 1000);
            },
            error: (errRes: HttpErrorResponse) => {
                this.customMessageService.displayToast(
                    "error",
                    "Error",
                    errRes.error.message
                )
            }
        })
    }

    addVehicleType() {
        this.vehicleTypeService.editMode.next(false);
        this.router.navigate(["new"], {relativeTo: this.activeRoute});
    }

    updateVehicleType(index: number) {
        this.vehicleTypeService.selectedVehicleType.next(this.vehicleTypes[index]);
        this.vehicleTypeService.editMode.next(true);
        this.router.navigate([index+1, "update"], {relativeTo: this.activeRoute});
    }

    ngOnDestroy() {
        this.vehicleTypeSubscription.unsubscribe();
    }
}