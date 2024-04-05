import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EmployeeInterface } from './employee.interface';
import { EmployeeService } from './employee.service';
import { SuccessResponseInterface } from '../shared/success-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMessageService } from '../shared/custom-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, OnDestroy{

  employeeService = inject(EmployeeService);
  customMessageService = inject(CustomMessageService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  employees: EmployeeInterface[];
  employeeSubscription: Subscription;

  ngOnInit() {
    this.getAllEmployees()
  }

  getAllEmployees() {
    this.employeeSubscription=
    this.employeeService.getAllEmployees().
    subscribe({
      next: (resData: SuccessResponseInterface<EmployeeInterface>) => {
        this.employees = resData.data;
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

  addEmployee() {
    this.router.navigate(["new"], {relativeTo: this.activeRoute});
  }

  viewEmployee(index: number) {
    this.employeeService.selectedEmployee.next(this.employees[index]);
    this.router.navigate([index+1], {relativeTo: this.activeRoute});
  }

  updateEmployee(index: number) {
    this.employeeService.selectedEmployee.next(this.employees[index]);
    this.router.navigate([index+1, "update"], {relativeTo: this.activeRoute});
  }

  deleteEmployee(index: number) {

  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }
}
