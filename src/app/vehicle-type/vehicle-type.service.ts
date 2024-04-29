import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { VehicleTypeInterface } from "./vehicle-type.interface";
import { BehaviorSubject, throwError } from "rxjs";

const VEHICLE_TYPE_URL = environment.apiUrl + "/v1/vehicle-types";

@Injectable({
    providedIn: "root"
})
export class VehicleTypeService {

    httpClient = inject(HttpClient);
    selectedVehicleType = new BehaviorSubject<VehicleTypeInterface>(null);
    editMode = new BehaviorSubject(null);

    getAllVehicleTypes() {
        return this.httpClient.get<SuccessResponseInterface<VehicleTypeInterface>>(
            VEHICLE_TYPE_URL
        );
    }

    createNewVehicleType(vehicleTypeObject: VehicleTypeInterface) {
        return this.httpClient.post<SuccessResponseInterface<any>>(
            VEHICLE_TYPE_URL,
            vehicleTypeObject
        );
    }

    updateVehicleType(vehicleTypeId: string, vehicleTypeObject: VehicleTypeInterface) {
        let singleVehicleTypeUrl = VEHICLE_TYPE_URL + "/" + vehicleTypeId;
        return this.httpClient.put<SuccessResponseInterface<any>>(
            singleVehicleTypeUrl,
            vehicleTypeObject
        );
    }
}