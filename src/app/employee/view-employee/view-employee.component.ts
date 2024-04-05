import { CustomMessageService } from './../../shared/custom-message.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EmployeeInterface } from '../employee.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit, OnDestroy{

  employeeService = inject(EmployeeService);
  customMessageService = inject(CustomMessageService);
  router = inject(Router);
  visible: boolean = true;
  employee: EmployeeInterface;
  employeeSubscription: Subscription;

  ngOnInit() {
    this.employeeSubscription=
    this.employeeService.selectedEmployee.subscribe({
      next: (empData: EmployeeInterface) => {
        this.employee = empData;
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

  onClose() {
    this.visible = false;
    this.router.navigate(["employees"]);
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }
}
