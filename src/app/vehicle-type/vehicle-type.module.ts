import { NgModule } from "@angular/core";
import { VehicleTypeComponent } from "./vehicle-type.component";
import { CreateUpdateVehicleTypeComponent } from "./create-update-vehicle-type/create-update-vehicle-type.component";
import { CommonModule } from "@angular/common";
import { VehicleTypeRoutingModule } from "./vehicle-type.routing";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        VehicleTypeComponent,
        CreateUpdateVehicleTypeComponent
    ],
    imports: [
        CommonModule,
        VehicleTypeRoutingModule,
        SharedModule,
        TableModule,
        ButtonModule,
        DialogModule,
        FormsModule,
        InputTextModule
    ]
})
export class VehicleTypeModule {

}