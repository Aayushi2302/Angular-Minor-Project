import { CustomMessageService } from './../../shared/custom-message.service';
import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { SuccessResponseInterface } from '../../shared/success-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-update-employee',
  templateUrl: './create-update-employee.component.html',
  styleUrl: './create-update-employee.component.css'
})
export class CreateUpdateEmployeeComponent implements OnDestroy{
  
  visible: boolean = true;
  router = inject(Router);
  genders: Array<string> = ["Male", "Female", "Other"];
  selectedGender = "Male";
  roles = [
    {name: "admin", isDisable: true},
    {name: "attendant", isDisable: false}
  ]
  employee : any = {}
  employeeService= inject(EmployeeService);
  customMessageService = inject(CustomMessageService);
  employeeSubscription: Subscription;
  
  @ViewChild('form') formElement: NgForm;

  onSubmit() {

    this.employee.username = this.formElement.value.username;
    this.employee.name = this.formElement.value.name;
    this.employee.age = this.formElement.value.age;
    this.employee.gender = this.formElement.value.gender;
    this.employee.mobile_no = this.formElement.value.mobile_no;
    this.employee.email_address = this.formElement.value.email;
    this.employee.role = this.formElement.value.role.name;
   
    this.employeeSubscription=
    this.employeeService.createNewEmployee(this.employee).subscribe({
      next: (resData: SuccessResponseInterface<[]>) => {
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
    this.onClose();
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["employees"]);
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }
}
