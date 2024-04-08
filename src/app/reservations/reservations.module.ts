import { NgModule } from "@angular/core";
import { ReservationsComponent } from "./reservations.component";
import { ReservationsRoutingModule } from "./reservations-routing.module";
import { RouterModule } from "@angular/router";
import { TableModule } from 'primeng/table';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ReservationsComponent
    ],
    imports: [
        ReservationsRoutingModule,
        RouterModule,
        TableModule,
        CommonModule
    ]
})
export class ReservationsModule { }