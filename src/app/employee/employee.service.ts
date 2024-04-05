import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { EmployeeInterface } from "./employee.interface";
import { catchError } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class EmployeeService {

    httpClient = inject(HttpClient);
    selectedEmployee = new BehaviorSubject<EmployeeInterface>(null);

    getAllEmployees() {
        const empUrl = environment.apiUrl + "/v1/employees";
        return this.httpClient.get<SuccessResponseInterface<EmployeeInterface>>(
            empUrl
        );
    }

    createNewEmployee(empObject: EmployeeInterface) {
        const empUrl = environment.apiUrl + "/v1/employees";
        return this.httpClient.post<SuccessResponseInterface<[]>>(
            empUrl,
            empObject
        ).pipe(catchError(err => {
            console.log(err);
            return throwError(()=> err);
        }))
    }
}