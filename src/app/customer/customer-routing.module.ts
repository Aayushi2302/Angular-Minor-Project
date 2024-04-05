import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { ViewCustomerComponent } from "./view-customer/view-customer.component";
import { CreateUpdateCustomerComponent } from "./create-update-customer/create-update-customer.component";

const routes: Routes = [
    {
        path: "", 
        component: CustomerComponent,
        children: [
            {path: "new", component: CreateUpdateCustomerComponent},
            {path: ":id", component: ViewCustomerComponent},
            {path: ":id/update", component: CreateUpdateCustomerComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {

}