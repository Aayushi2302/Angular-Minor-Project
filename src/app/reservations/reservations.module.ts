import { NgModule } from "@angular/core";
import { ReservationsComponent } from "./reservations.component";
import { ReservationsRoutingModule } from "./reservations-routing.module";
import { RouterModule } from "@angular/router";
import { TableModule } from 'primeng/table';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ReservationsComponent
    ],
    imports: [
        ReservationsRoutingModule,
        SharedModule,
        RouterModule,
        TableModule,
        CommonModule
    ]
})
export class ReservationsModule { }