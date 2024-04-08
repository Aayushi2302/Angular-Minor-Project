import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environments/environment';
import { SuccessResponseInterface } from '../shared/success-response.interface';
import { CustomerInterface } from './customer.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class CustomerService {

    httpClient = inject(HttpClient);
    selectedCustomer = new BehaviorSubject<CustomerInterface>(null);
    editMode = new BehaviorSubject<boolean>(null);


    getAllCustomers() {
        const customerUrl = environment.apiUrl + "/v1/customers";
        return this.httpClient.get<SuccessResponseInterface<CustomerInterface>>(
            customerUrl
        );
    }

    createNewCustomer(customerObj: CustomerInterface) {
        const customerUrl = environment.apiUrl + "/v1/customers";
        return this.httpClient.post<SuccessResponseInterface<any>>(
            customerUrl,
            customerObj
        );
    }

    updateCustomerDetails(customerId: string, customerObj: CustomerInterface) {
        const customerUrl = environment.apiUrl + "/v1/customers/" + customerId;
        return this.httpClient.put<SuccessResponseInterface<any>>(
            customerUrl,
            customerObj
        );
    }

    deleteCustomer(customerId: string) {
        const customerUrl = environment.apiUrl + "/v1/customers/" + customerId;
        return this.httpClient.delete<SuccessResponseInterface<any>>(
            customerUrl
        );
    }
}