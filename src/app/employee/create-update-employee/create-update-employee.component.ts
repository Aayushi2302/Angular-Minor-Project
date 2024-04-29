import { OnInit, AfterViewInit } from '@angular/core';
import { CustomMessageService } from './../../shared/custom-message.service';
import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { SuccessResponseInterface } from '../../shared/success-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { EmployeeInterface } from '../employee.interface';

@Component({
  selector: 'app-create-update-employee',
  templateUrl: './create-update-employee.component.html',
  styleUrl: './create-update-employee.component.css'
})
export class CreateUpdateEmployeeComponent implements OnInit, AfterViewInit, OnDestroy{
  
  visible: boolean = true;
  editMode: boolean;
  selectedEmployeeId: string;
  genders: Array<string> = ["Male", "Female", "Other"];
  selectedGender = "Male";
  roles = [
    {name: "admin", isDisable: true},
    {name: "attendant", isDisable: false}
  ]
  employee : any = {}
  router = inject(Router);
  employeeService= inject(EmployeeService);
  customMessageService = inject(CustomMessageService);
  employeeSubscription: Subscription;
  
  @ViewChild('form') formElement: NgForm;

  ngOnInit() {
    this.employeeService.selectedEmployee.subscribe((emittedData: EmployeeInterface) => {
      this.employee = emittedData;
    });

    this.employeeService.editMode.subscribe((emittedData: boolean) => this.editMode = emittedData);
  }

  ngAfterViewInit() {
    if (this.editMode){
      setTimeout(()=>{
        this.formElement.form.setValue({
          "employee-data": {
            username: this.employee.username,
            name: this.employee.name,
            age: this.employee.age,
            gender: this.employee.gender,
            mobile_no: this.employee.mobile_no,
            email: this.employee.email_address,
            role: {
              name: this.employee.role,
              isDisable: false
            }
          }
        })
        this.selectedEmployeeId = this.employee.emp_id;
      }, 0);
    }
  }

  getEmployeeDetails() {
    this.employee = {};
    this.employee.username = this.formElement.value["employee-data"].username;
    this.employee.name = this.formElement.value["employee-data"].name;
    this.employee.age = this.formElement.value["employee-data"].age;
    this.employee.gender = this.formElement.value["employee-data"].gender;
    this.employee.mobile_no = this.formElement.value["employee-data"].mobile_no;
    this.employee.email_address = this.formElement.value["employee-data"].email;
    this.employee.role = this.formElement.value["employee-data"].role.name;
  }

  onSubmit() {
    this.getEmployeeDetails();
    if (!this.editMode) this.createEmployee();
    else this.updateEmployee();
    console.log(this.formElement);
  }

  createEmployee() {
    this.employeeSubscription=
    this.employeeService.createNewEmployee(this.employee).subscribe({
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

  updateEmployee() {
    this.employeeSubscription=
    this.employeeService.updateEmployeeDetails(this.selectedEmployeeId, this.employee).subscribe({
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
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["employees"]);
  }

  ngOnDestroy() {
    if(this.employeeSubscription) this.employeeSubscription.unsubscribe();
  }
}