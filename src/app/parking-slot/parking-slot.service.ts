import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SuccessResponseInterface } from '../shared/success-response.interface';
import { ParkingSlotInterface,  ParkingSlotUpdateInterface,  ReservationRequestInterface, ReservationResponseInterface, VacateRequestInterface, VacateResponeInterface } from './parking-slot-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ParkingSlotService{

    httpClient = inject(HttpClient);
    selectedParkingSlot = new BehaviorSubject<ParkingSlotInterface>(null);
    editMode = new BehaviorSubject<boolean>(null);
    vacate = new BehaviorSubject<boolean>(null);
    
    getAllParkingSlots() {
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots";
        return this.httpClient.get<SuccessResponseInterface<ParkingSlotInterface>>(
            parkingSlotUrl
        )
    }

    createNewParkingSlot(parkingSlotData: ParkingSlotInterface) {
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots";
        return this.httpClient.post<SuccessResponseInterface<any>>(
            parkingSlotUrl,
            parkingSlotData
        )
    }

    updateParkingSlot(parkingSlotNo: string, parkingSlotData: ParkingSlotUpdateInterface) {
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots/" + parkingSlotNo;
        return this.httpClient.put<SuccessResponseInterface<any>>(
            parkingSlotUrl,
            parkingSlotData
        )
    }

    deleteParkingSlot(parkingSlotNo: string){
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots/" + parkingSlotNo;
        return this.httpClient.delete<SuccessResponseInterface<any>>(
            parkingSlotUrl
        )
    }

    reserveParkingSlot(reservationData: ReservationRequestInterface) {
        const reservationUrl = environment.apiUrl + "/v1/reserve/parking-slot";
        return this.httpClient.post<SuccessResponseInterface<ReservationResponseInterface>>(
            reservationUrl,
            reservationData
        )
    }

    vacateParkingSlot(vacateData: VacateRequestInterface) {
        const vacateUrl = environment.apiUrl + "/v1/vacate/parking-slot";
        return this.httpClient.put<SuccessResponseInterface<VacateResponeInterface>>(
            vacateUrl,
            vacateData
        )
    }
}