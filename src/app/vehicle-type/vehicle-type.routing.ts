import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VehicleTypeComponent } from "./vehicle-type.component";
import { CreateUpdateVehicleTypeComponent } from "./create-update-vehicle-type/create-update-vehicle-type.component";

const routes: Routes = [
    {
        path: "",
        component: VehicleTypeComponent,
        children: [
            {path: "new", component: CreateUpdateVehicleTypeComponent},
            {path: ":id/update", component: CreateUpdateVehicleTypeComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleTypeRoutingModule { }