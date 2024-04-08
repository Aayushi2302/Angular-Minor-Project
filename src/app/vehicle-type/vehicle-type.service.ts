import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { VehicleTypeInterface } from "./vehicle-type.interface";
import { catchError } from "rxjs/operators";
import { BehaviorSubject, throwError, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class VehicleTypeService {

    httpClient = inject(HttpClient);
    selectedVehicleType = new BehaviorSubject<VehicleTypeInterface>(null);
    editMode = new BehaviorSubject(null);

    getAllVehicleTypes() {
        const vehicleTypeUrl = environment.apiUrl + "/v1/vehicle-types";
        return this.httpClient.get<SuccessResponseInterface<VehicleTypeInterface>>(
            vehicleTypeUrl
        );
    }

    createNewVehicleType(vehicleTypeObject: VehicleTypeInterface) {
        const vehicleTypeUrl = environment.apiUrl + "/v1/vehicle-types";
        return this.httpClient.post<SuccessResponseInterface<[]>>(
            vehicleTypeUrl,
            vehicleTypeObject
        ).pipe(catchError(err => {
            console.log(err);
            return throwError(()=> err);
        }))
    }
}