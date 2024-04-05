import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ]
})
export class AuthModule { }