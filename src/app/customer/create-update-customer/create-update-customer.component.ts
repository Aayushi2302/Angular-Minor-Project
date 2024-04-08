import { Router } from '@angular/router';
import { CustomerService } from './../customer.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleTypeService } from '../../vehicle-type/vehicle-type.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomMessageService } from '../../shared/custom-message.service';
import { NgForm } from '@angular/forms';
import { CustomerInterface } from '../customer.interface';
import { SuccessResponseInterface } from '../../shared/success-response.interface';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrl: './create-update-customer.component.css'
})
export class CreateUpdateCustomerComponent implements OnInit, OnDestroy, AfterViewInit{
  
  visible = true;
  router = inject(Router);
  customerService = inject(CustomerService);
  vehicleTypeService = inject(VehicleTypeService);
  customMessageService = inject(CustomMessageService);
  customer: any = {};
  selectedCustomerId: string;
  vehicleTypes: any = [];
  editMode: boolean;

  vehicleTypeSubscription: Subscription;
  customerSubscription: Subscription;

  @ViewChild('form') formElement: NgForm;
  
  ngOnInit() {

    this.customerService.selectedCustomer.subscribe((emittedData: CustomerInterface) => {
      this.customer = emittedData;
    });

    this.customerService.editMode.subscribe((emittedData: boolean) => this.editMode = emittedData);

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
  }

  ngAfterViewInit() {
    if (this.editMode){
      setTimeout(()=>{
        this.formElement.form.setValue({
          "customer-data": {
            name: this.customer.name,
            mobile_no: this.customer.mobile_no,
            vehicle_no: this.customer.vehicle_no,
            vehicle_type_name: this.customer.vehicle_type_name
          }
        })
        this.selectedCustomerId = this.customer.customer_id;
      }, 0);
    }
  }

  onSubmit() {
    this.getCustomerDetails();
    if (!this.editMode) this.createCustomer();
    else this.updateCustomer();
    this.onClose();
  }

  getCustomerDetails() {
    this.customer = {};
    this.customer.name = this.formElement.value["customer-data"].name;
    this.customer.mobile_no = this.formElement.value["customer-data"].mobile_no;
    this.customer.vehicle_no = this.formElement.value["customer-data"].vehicle_no;
    this.customer.vehicle_type_name = this.formElement.value["customer-data"].vehicle_type_name;
  }

  createCustomer() {
    this.customerSubscription=
      this.customerService.createNewCustomer(this.customer)
      .subscribe({
        next: (resData: SuccessResponseInterface<any>) => {
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

  updateCustomer() {
    this.customerSubscription=
      this.customerService.updateCustomerDetails(this.selectedCustomerId, this.customer)
      .subscribe({
        next: (resData: SuccessResponseInterface<any>) => {
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

  onClose() {
    this.visible = false;
    this.router.navigate(["customers"]);
  }

  ngOnDestroy() {

    this.vehicleTypeSubscription.unsubscribe();
    if (this.customerSubscription)  
        this.customerSubscription.unsubscribe();
  }
}
