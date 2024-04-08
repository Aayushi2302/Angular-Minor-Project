import { NgModule } from "@angular/core";
import { ReservationsComponent } from "./reservations.component";
import { ReservationsRoutingModule } from "./reservations-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ReservationsComponent
    ],
    imports: [
        ReservationsRoutingModule,
        RouterModule
    ]
})
export class ReservationsModule { }