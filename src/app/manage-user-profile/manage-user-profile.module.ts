import { NgModule } from "@angular/core";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ManageUserProfileRoutingModule } from "./manage-user-profile-routing.module";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ViewProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ManageUserProfileRoutingModule,
        PasswordModule,
        ButtonModule
    ]
})
export class ManageUserProfileModule { }