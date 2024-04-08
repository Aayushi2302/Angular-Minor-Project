import { OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ParkingSlotService } from './../parking-slot.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomMessageService } from '../../shared/custom-message.service';
import { ReservationResponseInterface, VacateResponeInterface } from '../parking-slot-interface';
import { Subscription } from 'rxjs';
import { SuccessResponseInterface } from '../../shared/success-response.interface';

@Component({
  selector: 'app-reserve-parking-slot',
  templateUrl: './reserve-vacate-parking-slot.component.html',
  styleUrl: './reserve-vacate-parking-slot.component.css'
})
export class ReserveVacateParkingSlotComponent implements OnInit, OnDestroy{
  today = new Date();
  visible = true;
  router = inject(Router);
  parkingSlotService = inject(ParkingSlotService);
  customMessageService = inject(CustomMessageService);

  vacate: boolean;
  reserveOrVacateObj: any = {};
  @ViewChild('form') formElement: NgForm;

  parkinSlotSubscription: Subscription;

  ngOnInit() {
    this.parkingSlotService.vacate.subscribe((emittedData: boolean) => this.vacate = emittedData);
  }

  getDate(dateObj: Date) {
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    let newDate = (date < 10) ? "0" + date : date.toString();
    let newMonth = (month < 10) ? "0" + month : month.toString();
    return `${newDate}-${newMonth}-${year}`;
  }

  onSubmit() {
    if(!this.vacate) {
      this.reserveOrVacateObj.vehicle_no = this.formElement.value.vehicle_no;
      this.reserveOrVacateObj.out_date = this.getDate(this.formElement.value.out_date);
      this.reserveSlot();
    }
    else {
      this.reserveOrVacateObj.vehicle_no = this.formElement.value.vehicle_no;
      this.vacateSlot();
    }
  }

  reserveSlot() {
    this.parkinSlotSubscription=
        this.parkingSlotService.reserveParkingSlot(this.reserveOrVacateObj)
        .subscribe({
          next: (resData: SuccessResponseInterface<ReservationResponseInterface>) => {
            this.customMessageService.displayToast(
              "success",
              "Success",
              resData.message
            )
            console.log(resData);
          },
          error: (errRes: HttpErrorResponse) => {
            console.log(errRes);
            this.customMessageService.displayToast(
              "error",
              "Error",
              errRes.error.message
            );
          }
        })
  }

  vacateSlot() {
    this.parkinSlotSubscription=
        this.parkingSlotService.vacateParkingSlot(this.reserveOrVacateObj)
        .subscribe({
          next: (resData: SuccessResponseInterface<VacateResponeInterface>) => {
            this.customMessageService.displayToast(
              "success",
              "Success",
              resData.message
            )
            console.log(resData);
          },
          error: (errRes: HttpErrorResponse) => {
            this.customMessageService.displayToast(
              "error",
              "Error",
              errRes.error.message
            );
          }
        })
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["parking-slots"]);
  }
  
  ngOnDestroy() {
    if(this.parkinSlotSubscription) this.parkinSlotSubscription.unsubscribe();
  }
}
