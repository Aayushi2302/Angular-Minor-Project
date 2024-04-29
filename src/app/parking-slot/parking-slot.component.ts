import { CustomMessageService } from './../shared/custom-message.service';
import { SuccessResponseInterface } from './../shared/success-response.interface';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ParkingSlotService } from './parking-slot.service';
import { ParkingSlotInterface } from './parking-slot-interface';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrl: './parking-slot.component.css'
})
export class ParkingSlotComponent implements OnInit, OnDestroy{

  parkingSlotService = inject(ParkingSlotService);
  userService = inject(UserService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  customMessageService = inject(CustomMessageService);

  parkingSlotSubscription: Subscription;

  role: string;
  parkingSlots: ParkingSlotInterface[];
  loading = true;


  ngOnInit() {
    this.getAllParkingSlots();
    this.role = this.userService.getRole();
  }

  getAllParkingSlots() {
    this.parkingSlotSubscription = 
      this.parkingSlotService.getAllParkingSlots()
      .subscribe({
        next: (resData: SuccessResponseInterface<ParkingSlotInterface>) => {
          this.parkingSlots = resData.data;
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

  getParkingSlotClass(parkingSlot: ParkingSlotInterface) {
    if (parkingSlot.status == "vacant")
      return "parking-slot-vacant"
    else if (parkingSlot.status == "booked")
      return "parking-slot-booked"
    else if (parkingSlot.status == "inactive")
      return "parking-slot-inactive"
    else 
      return ""
  }

  addParkingSlot() {
    this.router.navigate(["new"], {relativeTo: this.activeRoute});
    this.parkingSlotService.editMode.next(false);
  }

  updateParkingSlot(index: number) {
    this.parkingSlotService.selectedParkingSlot.next(this.parkingSlots[index]);
    this.router.navigate([index+1, "update"], {relativeTo: this.activeRoute});
    this.parkingSlotService.editMode.next(true);
  }

  deleteParkingSlot(index: number) {
    let psn = this.parkingSlots[index].parking_slot_no;
    this.parkingSlotSubscription=
      this.parkingSlotService.deleteParkingSlot(psn)
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
          console.log(errRes);
        }
      })
  }

  reserveParkingSlot() {
    this.router.navigate(["reserve"], {relativeTo: this.activeRoute});
    this.parkingSlotService.vacate.next(false);
  }

  vacateParkingSlot() {
    this.router.navigate(["vacate"], {relativeTo: this.activeRoute});
    this.parkingSlotService.vacate.next(true);
  }

  ngOnDestroy() {
    this.parkingSlotSubscription.unsubscribe();
  }
}
