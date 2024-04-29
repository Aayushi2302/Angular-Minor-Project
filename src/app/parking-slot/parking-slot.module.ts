import { ParkingSlotRoutingModule } from './parking-slot-routing.module';
import { NgModule } from "@angular/core";
import { ParkingSlotComponent } from "./parking-slot.component";
import { CreateUpdateParkingSlotComponent } from "./create-update-parking-slot/create-update-parking-slot.component";
import { ReserveVacateParkingSlotComponent } from "./reserve-vacate-parking-slot/reserve-vacate-parking-slot.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ParkingSlotComponent,
        CreateUpdateParkingSlotComponent,
        ReserveVacateParkingSlotComponent
    ],
    imports: [
        ParkingSlotRoutingModule,
        SharedModule,
        RouterModule,
        FormsModule,
        CommonModule,
        CardModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        CalendarModule
    ]
})
export class ParkingSlotModule {

}