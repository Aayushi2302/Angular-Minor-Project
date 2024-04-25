import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { authGuard } from "./guards/auth.guard";
import { allowedUsers } from "./guards/user-role.guard";

const routes : Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: AuthComponent},
    {
        path: "employees",
        loadChildren: () =>
            import("./employee/employee.module").then(m => m.EmployeeModule),
        canActivate: [authGuard, allowedUsers("admin")]
    },
    {
        path: "vehicle-types",
        loadChildren: () =>
            import("./vehicle-type/vehicle-type.module").then(m => m.VehicleTypeModule),
        canActivate: [authGuard]
    },
    {
        path: "parking-slots",
        loadChildren: () =>
            import("./parking-slot/parking-slot.module").then(m => m.ParkingSlotModule),
        canActivate: [authGuard]
    },
    {
        path: "customers",
        loadChildren: () =>
            import("./customer/customer.module").then(m => m.CustomerModule),
        canActivate: [authGuard, allowedUsers("attendant")]
    },
    {
        path: "reservations",
        loadChildren: () =>
            import("./reservations/reservations.module").then(m => m.ReservationsModule),
        canActivate: [authGuard]
    },
    {
        path: "",
        loadChildren: () =>
            import("./manage-user-profile/manage-user-profile.module").then(m => m.ManageUserProfileModule),
        canActivate: [authGuard]
    },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }