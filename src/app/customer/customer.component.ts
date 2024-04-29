import { CustomMessageService } from './../shared/custom-message.service';
import { SuccessResponseInterface } from './../shared/success-response.interface';
import { CustomerService } from './customer.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CustomerInterface } from './customer.interface';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, OnDestroy{

  customerService = inject(CustomerService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  customMessageService = inject(CustomMessageService);
  customersGetSubscription: Subscription;
  customers: CustomerInterface[];
  loading = true;

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customersGetSubscription=
      this.customerService.getAllCustomers()
      .subscribe({
        next: (resData: SuccessResponseInterface<CustomerInterface>) => {
          this.customers = resData.data;
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
      });
  }

  viewCustomer(index: number) {
    this.customerService.selectedCustomer.next(this.customers[index]);
    this.router.navigate([index+1], {relativeTo: this.activeRoute});
  }

  addCustomer() {
    this.router.navigate(["new"], {relativeTo: this.activeRoute});
    this.customerService.editMode.next(false);
  }

  updateCustomer(index: number) {
    this.customerService.selectedCustomer.next(this.customers[index]);
    this.router.navigate([index+1, "update"], {relativeTo: this.activeRoute});
    this.customerService.editMode.next(true);
  }

  deleteCustomer(index: number) {
    let customerId = this.customers[index].customer_id;
    this.customersGetSubscription=
      this.customerService.deleteCustomer(customerId)
      .subscribe({
        next: (resData: SuccessResponseInterface<CustomerInterface>) => {
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
        }
      });
  }

  ngOnDestroy() {
    this.customersGetSubscription.unsubscribe();
  }
}
