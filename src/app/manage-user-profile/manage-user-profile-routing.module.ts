import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";


const routes: Routes = [
    {
        path: "view-profile",
        component: ViewProfileComponent
    },
    {
        path: "change-password",
        component: ChangePasswordComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageUserProfileRoutingModule { }