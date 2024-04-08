import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ReservationsService } from './reservations.service';
import { SuccessResponseInterface } from '../shared/success-response.interface';
import { ReservationsInterface } from './reservations.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomMessageService } from '../shared/custom-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit, OnDestroy {

  reservationsService = inject(ReservationsService);
  customMessageService = inject(CustomMessageService);

  reservationsSubscription: Subscription;

  reservations: ReservationsInterface[];

  ngOnInit() {
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationsSubscription=
      this.reservationsService.getAllReservations()
      .subscribe({
        next: ( resData: SuccessResponseInterface<ReservationsInterface>) => {
          this.reservations = resData.data;
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

  ngOnDestroy() {
    this.reservationsSubscription.unsubscribe();
  }
}
