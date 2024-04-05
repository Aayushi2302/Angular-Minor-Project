import { Router } from '@angular/router';
import { CustomerService } from './../customer.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleTypeService } from '../../vehicle-type/vehicle-type.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomMessageService } from '../../shared/custom-message.service';
import { VehicleTypeInterface } from '../../vehicle-type/vehicle-type.interface';
import { NgForm } from '@angular/forms';
import { CustomerInterface } from '../customer.interface';
import { SuccessResponseInterface } from '../../shared/success-response.interface';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrl: './create-update-customer.component.css'
})
export class CreateUpdateCustomerComponent implements OnInit, OnDestroy, AfterViewInit{

  vehicleTypeService = inject(VehicleTypeService);
  customerService = inject(CustomerService);
  customMessageService = inject(CustomMessageService);
  router = inject(Router);
  visible = true;
  vehicleTypeSubscription: Subscription;
  vehicleTypes: VehicleTypeInterface[];
  editMode: boolean

  customerPostSubscription: Subscription;
  customerPutSubscription: Subscription;

  customer: any = {};
  selectedCustomerId: string;

  @ViewChild('form') formElement: NgForm;
  
  ngOnInit() {
    
    this.customerService.selectedCustomer.subscribe({
      next: (custData: CustomerInterface) => {
        this.customer = custData;
        this.selectedCustomerId = this.customer.customer_id;
      },
      error: (errRes: HttpErrorResponse) => {
        this.customMessageService.displayToast(
          "error",
          "Error",
          errRes.error.message
        );
      }
    })
    
    this.vehicleTypeSubscription=
      this.vehicleTypeService.getAllVehicleTypes()
      .pipe(
        map(
          vehicleTypeObj => {
            let vehicleTypeData = vehicleTypeObj.data;
            let vehicleTypes = []
            for(let indx in vehicleTypeData){
              vehicleTypes.push(
                vehicleTypeData[indx].vehicle_type_name
              );
            }
            return vehicleTypes;
          }
        )
      )
      .subscribe({
          next: (resData: []) => {
            this.vehicleTypes = resData;
          },
          error: (errRes: HttpErrorResponse) => {
            this.customMessageService.displayToast(
              "error",
              "Error",
              errRes.error.message
            )
          }
      })
    
    this.customerService.editMode.subscribe((editModeCheck) => this.editMode = editModeCheck);
  }

  ngAfterViewInit() {
    if (this.customer) {
      console.log(this.formElement);
    }
  }

  onSubmit() {
    this.customer.name = this.formElement.value.name;
    this.customer.mobile_no = this.formElement.value.mobile_no;
    this.customer.vehicle_no = this.formElement.value.vehicle_no;
    this.customer.vehicle_type_name = this.formElement.value.vehicle_type_name;

    if (this.editMode === true) this.updateCustomer()
    else  this.createCustomer()
  }

  createCustomer() {
    this.customerPostSubscription = 
      this.customerService.createNewCustomer(this.customer)
      .subscribe({
        next: (resData: SuccessResponseInterface<[]>) => {
          this.customMessageService.displayToast(
            "success",
            "Success",
            resData.message
          );
        },
        error: (errRes: HttpErrorResponse) => {
          this.customMessageService.displayToast(
            "error",
            "Error",
            errRes.error.message
          );
        }
      })
  }

  updateCustomer() {
    this.customerPutSubscription = 
      this.customerService.updateCustomerDetails(this.selectedCustomerId, this.customer)
      .subscribe({
        next: (resData: SuccessResponseInterface<[]>) => {
          this.customMessageService.displayToast(
            "success",
            "Success",
            resData.message
          );
        },
        error: (errRes: HttpErrorResponse) => {
          this.customMessageService.displayToast(
            "error",
            "Error",
            errRes.error.message
          );
        }
      })
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["customers"]);
  }

  ngOnDestroy() {
    // this.customerPostSubscription.unsubscribe();
    // this.customerPutSubscription.unsubscribe();
  }
}
