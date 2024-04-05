import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ParkingSlotService } from '../parking-slot.service';
import { VehicleTypeService } from '../../vehicle-type/vehicle-type.service';
import { VehicleTypeInterface } from '../../vehicle-type/vehicle-type.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomMessageService } from '../../shared/custom-message.service';
import { Subscription } from 'rxjs';
import { SuccessResponseInterface } from '../../shared/success-response.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-update-parking-slot',
  templateUrl: './create-update-parking-slot.component.html',
  styleUrl: './create-update-parking-slot.component.css'
})
export class CreateUpdateParkingSlotComponent implements OnInit, OnDestroy{

  parkingSlotService = inject(ParkingSlotService);
  vehicleTypeService = inject(VehicleTypeService);
  router = inject(Router);
  customMessageService = inject(CustomMessageService);
  activeRoute = inject(ActivatedRoute);
  vehicleTypes: VehicleTypeInterface[];
  visible = true;
  vehicleTypeSubscription: Subscription;
  parkingSlotSubscription: Subscription;
  parkingSlot: any = {};

  possibleStatus = ["vacant", "active", "booked"];
  editMode: boolean;
  
  @ViewChild('form') formElement: NgForm;

  ngOnInit(){
    this.vehicleTypeSubscription=
      this.vehicleTypeService.getAllVehicleTypes()
      .pipe(
        map(
          vehicleTypeObj => {
            let vehicleTypeData = vehicleTypeObj.data;
            let vehicleTypes = []
            for(let indx in vehicleTypeData){
              vehicleTypes.push(
                vehicleTypeData[indx].vehicle_type_name
              );
            }
            return vehicleTypes;
          }
        )
      )
      .subscribe({
          next: (resData: []) => {
            this.vehicleTypes = resData;
            console.log(this.vehicleTypes);
          },
          error: (errRes: HttpErrorResponse) => {
            this.customMessageService.displayToast(
              "error",
              "Error",
              errRes.error.message
            )
          }
      })

    this.parkingSlotService.editMode.subscribe((editCheck)=> this.editMode = editCheck);
  }

  addParkingSlot() {
    this.parkingSlot.parking_slot_no = this.formElement.value.parking_slot_no;
    this.parkingSlot.vehicle_type_name = this.formElement.value.vehicle_type_name;
    this.parkingSlotSubscription=
    this.parkingSlotService.createNewParkingSlot(this.parkingSlot)
    .subscribe({
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
    })
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["parking-slots"]);
  }

  ngOnDestroy() {
    // this.vehicleTypeSubscription.unsubscribe();
    // this.parkingSlotSubscription.unsubscribe();
  }
}
