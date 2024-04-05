import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { CreateUpdateEmployeeComponent } from "./create-update-employee/create-update-employee.component";
import { ViewEmployeeComponent } from "./view-employee/view-employee.component";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { FormsModule } from "@angular/forms";
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
    declarations:[
        EmployeeComponent,
        CreateUpdateEmployeeComponent,
        ViewEmployeeComponent
    ],
    imports: [
        EmployeeRoutingModule,
        RouterModule,
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        RadioButtonModule,
        DropdownModule
    ]
})
export class EmployeeModule { }