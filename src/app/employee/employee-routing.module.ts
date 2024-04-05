import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { CreateUpdateEmployeeComponent } from "./create-update-employee/create-update-employee.component";
import { ViewEmployeeComponent } from "./view-employee/view-employee.component";

const routes: Routes = [
    {
        path: "", 
        component: EmployeeComponent,
        children: [
            {path: "new", component: CreateUpdateEmployeeComponent},
            {path: ":id", component: ViewEmployeeComponent},
            {path: ":id/update", component: CreateUpdateEmployeeComponent},

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }