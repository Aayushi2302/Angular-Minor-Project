import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { SuccessResponseInterface } from "../shared/success-response.interface";
import { EmployeeInterface } from "./employee.interface";
import { catchError } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";

const EMP_URL = environment.apiUrl + "/v1/employees";

@Injectable({
    providedIn: "root"
})
export class EmployeeService {

    httpClient = inject(HttpClient);
    selectedEmployee = new BehaviorSubject<EmployeeInterface>(null);
    editMode = new BehaviorSubject<boolean>(null);

    getAllEmployees() {
        return this.httpClient.get<SuccessResponseInterface<EmployeeInterface>>(
            EMP_URL
        );
    }

    createNewEmployee(empObject: EmployeeInterface) {
        return this.httpClient.post<SuccessResponseInterface<any>>(
            EMP_URL,
            empObject
        ).pipe(catchError(err => {
            console.log(err);
            return throwError(()=> err);
        }))
    }

    updateEmployeeDetails(employeeId: string, employeeObj: EmployeeInterface) {
        let singleEmpUrl = EMP_URL + "/" + employeeId;
        return this.httpClient.put<SuccessResponseInterface<any>>(
            singleEmpUrl,
            employeeObj
        );
    }

    deleteEmployee(employeeId: string) {
        let singleEmpUrl = EMP_URL + "/" + employeeId;
        return this.httpClient.delete<SuccessResponseInterface<any>>(
            singleEmpUrl
        );
    }
}