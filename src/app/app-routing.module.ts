import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const routes : Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: AuthComponent},
    {
        path: "employees",
        loadChildren: () =>
            import("./employee/employee.module").then(m => m.EmployeeModule)
    },
    {
        path: "vehicle-types",
        loadChildren: () =>
            import("./vehicle-type/vehicle-type.module").then(m => m.VehicleTypeModule)
    },
    {
        path: "parking-slots",
        loadChildren: () =>
            import("./parking-slot/parking-slot.module").then(m => m.ParkingSlotModule)
    },
    {
        path: "customers",
        loadChildren: () =>
            import("./customer/customer.module").then(m => m.CustomerModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }