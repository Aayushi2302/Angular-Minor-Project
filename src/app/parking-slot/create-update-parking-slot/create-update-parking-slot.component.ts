import { Component, OnDestroy, OnInit, ViewChild, inject, AfterViewInit } from '@angular/core';
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
import { ParkingSlotInterface } from '../parking-slot-interface';

@Component({
  selector: 'app-create-update-parking-slot',
  templateUrl: './create-update-parking-slot.component.html',
  styleUrl: './create-update-parking-slot.component.css'
})
export class CreateUpdateParkingSlotComponent implements OnInit, AfterViewInit, OnDestroy{

  parkingSlotService = inject(ParkingSlotService);
  vehicleTypeService = inject(VehicleTypeService);
  router = inject(Router);
  customMessageService = inject(CustomMessageService);
  activeRoute = inject(ActivatedRoute);
  
  vehicleTypeSubscription: Subscription;
  parkingSlotSubscription: Subscription;
  
  possibleStatus = ["vacant", "inactive"];
  editMode: boolean;
  parkingSlot: any = {};
  selectedParkingSlotNo: string;
  vehicleTypes: VehicleTypeInterface[];
  visible = true;
  
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

    this.parkingSlotService.selectedParkingSlot.subscribe((emittedData: ParkingSlotInterface) =>{
      this.parkingSlot = emittedData
    });
    this.parkingSlotService.editMode.subscribe((emittedData: boolean) => this.editMode = emittedData);
  }

  ngAfterViewInit() {
    if (this.editMode) {
      setTimeout(()=>{
        this.formElement.form.setValue({
          "parking-slot-data": {
            "parking_slot_no": this.parkingSlot.parking_slot_no,
            "vehicle_type_name": this.parkingSlot.vehicle_type_name,
            "status": this.parkingSlot.status
          }
        });
        this.selectedParkingSlotNo = this.parkingSlot.parking_slot_no;
      }, 0)
    }
  }

  onSubmit() {
    if (!this.editMode)   this.addParkingSlot();
    else this.updateParkingSlotStatus();
  }

  addParkingSlot() {
    this.parkingSlot = {};
    this.parkingSlot.parking_slot_no = this.formElement.value["parking-slot-data"].parking_slot_no;
    this.parkingSlot.vehicle_type_name = this.formElement.value["parking-slot-data"].vehicle_type_name;
    this.parkingSlotSubscription=
      this.parkingSlotService.createNewParkingSlot(this.parkingSlot)
      .subscribe({
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

  updateParkingSlotStatus() {
    let type_name = this.parkingSlot.vehicle_type_name;
    this.parkingSlot = {};
    this.parkingSlot.vehicle_type_name = type_name;
    this.parkingSlot.new_status = this.formElement.value["parking-slot-data"].status;
    console.log(this.parkingSlot);
    this.parkingSlotSubscription=
      this.parkingSlotService.updateParkingSlot(this.selectedParkingSlotNo, this.parkingSlot)
      .subscribe({
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
    this.router.navigate(["parking-slots"]);
  }

  ngOnDestroy() {
    this.vehicleTypeSubscription.unsubscribe();
    if(this.parkingSlotSubscription) this.parkingSlotSubscription.unsubscribe();
  }
}
