import { CustomMessageService } from './../../shared/custom-message.service';
import { Component, Input, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { VehicleTypeService } from "../vehicle-type.service";
import { VehicleTypeInterface } from "../vehicle-type.interface";
import { Subscription } from "rxjs";
import { SuccessResponseInterface } from "../../shared/success-response.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-create-update-vehicle-type",
    templateUrl: "./create-update-vehicle-type.component.html",
    styleUrl: "./create-update-vehicle-type.component.css"
})
export class CreateUpdateVehicleTypeComponent implements OnInit, OnDestroy{

    vehicleTypeService = inject(VehicleTypeService);
    customMessageService = inject(CustomMessageService);
    visible: boolean = true;
    router = inject(Router);
    editMode: boolean;

    vehicleType: any = {};
    @ViewChild('form') formElement: NgForm;
    vehicleTypeSubscription: Subscription;

    ngOnInit() {
        this.vehicleTypeService.editMode.subscribe((editCheck: boolean) => {
            this.editMode = editCheck;
        });
        this.vehicleTypeService.vehicleType.subscribe((vehicleTypeData) => {
            this.vehicleType = vehicleTypeData;
        })
    }

    ngAfterViewInit() {
        if (this.vehicleType) {
            console.log(this.formElement);
            // console.log(this.formElement.controls["price_per_hour"].setValue(this.vehicleType.vehicle_type_name));
            // this.formElement.controls["price_per_hour"].setValue(this.vehicleType.vehicle_type_name)
        }
    }

    onSubmit(){
        this.vehicleType.vehicle_type_name = this.formElement.value.vehicle_type_name;
        this.vehicleType.price_per_hour = this.formElement.value.price_per_hour;

        this.vehicleTypeSubscription =
        this.vehicleTypeService.createNewVehicleType(this.vehicleType).subscribe({
            next: (resData: SuccessResponseInterface<[]>) => {
                this.customMessageService.displayToast(
                    "success",
                    "Success",
                    resData.message
                )
            },
            error: (errRes: HttpErrorResponse) => {
                this.customMessageService.displayToast(
                    "error",
                    "Error",
                    errRes.error.message
                )
            }
        });
        this.onClose();
    }

    onClose() {
        this.visible = false;
        this.router.navigate(["vehicle-types"]);
    }

    ngOnDestroy() {
        // this.vehicleTypeSubscription.unsubscribe();
    }
}