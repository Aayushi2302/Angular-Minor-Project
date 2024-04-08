import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParkingSlotComponent } from "./parking-slot.component";
import { CreateUpdateParkingSlotComponent } from "./create-update-parking-slot/create-update-parking-slot.component";
import { ReserveVacateParkingSlotComponent } from "./reserve-vacate-parking-slot/reserve-vacate-parking-slot.component";

const routes: Routes = [
    {
        path: "",
        component: ParkingSlotComponent,
        children: [
            {path: "new", component: CreateUpdateParkingSlotComponent},
            {path: ":id/update", component: CreateUpdateParkingSlotComponent},
            {path: "reserve", component: ReserveVacateParkingSlotComponent},
            {path: "vacate", component: ReserveVacateParkingSlotComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParkingSlotRoutingModule { }