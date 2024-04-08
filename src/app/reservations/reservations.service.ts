import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environments/environment';
import { SuccessResponseInterface } from '../shared/success-response.interface';
import { ReservationsInterface } from './reservations.interface';

@Injectable({
    providedIn: "root"
})
export class ReservationsService {

    httpClient = inject(HttpClient);

    getAllReservations() {
        const reservationsUrl = environment.apiUrl + "/v1/reservations";
        return this.httpClient.get<SuccessResponseInterface<ReservationsInterface>>(
            reservationsUrl
        );
    }
}