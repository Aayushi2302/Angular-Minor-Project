import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CustomerInterface } from '../customer.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomMessageService } from '../../shared/custom-message.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnInit{

  customerService = inject(CustomerService);
  customMessageService = inject(CustomMessageService);
  router = inject(Router);
  visible = true;
  customer: CustomerInterface;
  
  ngOnInit() {
    this.customerService.selectedCustomer.subscribe({
      next: (custData: CustomerInterface) => {
        this.customer = custData;
      },
      error: (errRes: HttpErrorResponse) => {
        this.customMessageService.displayToast(
          "error",
          "Error",
          errRes.error.message
        );
      }
    });
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["customers"]);
  }
}
