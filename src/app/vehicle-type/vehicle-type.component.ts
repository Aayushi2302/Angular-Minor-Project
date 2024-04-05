import { UserService } from './../shared/user/user.service';
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { VehicleTypeService } from "./vehicle-type.service";
import { VehicleTypeInterface } from "./vehicle-type.interface";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-vehicle-type",
    templateUrl: "./vehicle-type.component.html",
    styleUrl: "./vehicle-type.component.css"
})
export class VehicleTypeComponent implements OnInit, OnDestroy{

    vehicleTypeService = inject(VehicleTypeService);
    userService = inject(UserService);
    router = inject(Router);
    activeRoute = inject(ActivatedRoute);
    vehicleTypes: VehicleTypeInterface[];
    vehicleTypeGetSubscription: Subscription;
    role: string;
    
    ngOnInit() {
        this.role = this.userService.getRole();
        this.vehicleTypeGetSubscription = 
        this.vehicleTypeService.getAllVehicleTypes()
        .subscribe({
            next: (resData: SuccessResponseInterface<VehicleTypeInterface>) => {
                this.vehicleTypes = resData.data;
            },
            error: (errRes: HttpErrorResponse) => {
                console.log(errRes);
            }
        })
    }

    addVehicleType() {
        this.router.navigate(["new"], {relativeTo: this.activeRoute});
        this.vehicleTypeService.editMode.next(false);
    }

    updateVehicleType(index: number) {
        this.vehicleTypeService.vehicleType.next(this.vehicleTypes[index]);
        this.vehicleTypeService.editMode.next(true);
        index++;
        this.router.navigate([index, "update"], {relativeTo: this.activeRoute});
    }

    ngOnDestroy() {
        this.vehicleTypeGetSubscription.unsubscribe();
    }
}