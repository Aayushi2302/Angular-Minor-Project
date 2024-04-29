import { CustomMessageService } from './../../shared/custom-message.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EmployeeInterface } from '../employee.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit{

  employeeService = inject(EmployeeService);
  customMessageService = inject(CustomMessageService);
  router = inject(Router);
  visible: boolean = true;
  employee: EmployeeInterface;
  employeeSubscription: Subscription;

  ngOnInit() {
    this.employeeService.selectedEmployee.subscribe((emittedData: EmployeeInterface) => {
      this.employee = emittedData;
    })
  }

  onClose() {
    this.visible = false;
    this.router.navigate(["employees"]);
  }
}