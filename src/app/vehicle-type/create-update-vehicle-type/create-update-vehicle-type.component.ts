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

    visible: boolean = true;
    editMode: boolean;
    vehicleType: any = {};
    selectedVehicleTypeId: string;
    vehicleTypeService = inject(VehicleTypeService);
    customMessageService = inject(CustomMessageService);
    router = inject(Router);
    vehicleTypeSubscription: Subscription;

    @ViewChild('form') formElement: NgForm;

    ngOnInit() {
        this.vehicleTypeService.editMode.subscribe((emittedData: boolean) => this.editMode = emittedData);
        this.vehicleTypeService.selectedVehicleType.subscribe((emittedData: VehicleTypeInterface) => {
            this.vehicleType = emittedData;
        })
    }

    ngAfterViewInit() {
        if (this.editMode) {
            setTimeout(()=> {
                this.formElement.form.setValue({
                    "vehicle-type-data": {
                        "vehicle_type_name": this.vehicleType.vehicle_type_name,
                        "price_per_hour": this.vehicleType.price_per_hour
                    }
                })
                this.selectedVehicleTypeId = this.vehicleType.type_id;
            }, 0);
        }
    }

    getVehicleTypeDetails() {
        if (!this.editMode){
            this.vehicleType = {};
            this.vehicleType.vehicle_type_name = this.formElement.value["vehicle-type-data"].vehicle_type_name;
        }
        else    delete this.vehicleType.type_id;
        this.vehicleType.price_per_hour = this.formElement.value["vehicle-type-data"].price_per_hour;
    }

    onSubmit(){
        this.getVehicleTypeDetails();
        if(!this.editMode)   this.createVehicleType();
        else this.updateVehicleDetails();
        this.onClose();
    }

    createVehicleType() {
        this.vehicleTypeSubscription =
        this.vehicleTypeService.createNewVehicleType(this.vehicleType).subscribe({
            next: (resData: SuccessResponseInterface<any>) => {
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
    }

    updateVehicleDetails() {
        this.vehicleTypeSubscription =
        this.vehicleTypeService.updateVehicleType(this.selectedVehicleTypeId, this.vehicleType).subscribe({
            next: (resData: SuccessResponseInterface<any>) => {
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
    }

    onClose() {
        this.visible = false;
        this.router.navigate(["vehicle-types"]);
    }

    ngOnDestroy() {
        if (this.vehicleTypeSubscription) this.vehicleTypeSubscription.unsubscribe();
    }
}