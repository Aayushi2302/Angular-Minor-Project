import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SuccessResponseInterface } from '../shared/success-response.interface';
import { ParkingSlotInterface, ParkingSlotUpdateInterface } from './parking-slot-interface';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../shared/user/user.service';

@Injectable({
    providedIn: "root"
})
export class ParkingSlotService{

    httpClient = inject(HttpClient);
    editMode = new BehaviorSubject<boolean>(null);
    
    getAllParkingSlots() {
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots";
        return this.httpClient.get<SuccessResponseInterface<ParkingSlotInterface>>(
            parkingSlotUrl
        )
    }

    createNewParkingSlot(parkingSlotData: ParkingSlotInterface) {
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots";
        return this.httpClient.post<SuccessResponseInterface<[]>>(
            parkingSlotUrl,
            parkingSlotData
        )
    }

    deleteParkingSlot(parkingSlotNo: string){
        const parkingSlotUrl = environment.apiUrl + "/v1/parking-slots/" + parkingSlotNo;
        console.log(parkingSlotUrl);
        return this.httpClient.delete<SuccessResponseInterface<[]>>(
            parkingSlotUrl
        )
    }
}