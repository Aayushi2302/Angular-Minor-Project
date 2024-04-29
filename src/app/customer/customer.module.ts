import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { ViewCustomerComponent } from "./view-customer/view-customer.component";
import { CreateUpdateCustomerComponent } from "./create-update-customer/create-update-customer.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        CustomerComponent,
        ViewCustomerComponent,
        CreateUpdateCustomerComponent
    ],
    imports: [
        CustomerRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        PasswordModule
    ]
})
export class CustomerModule {

}