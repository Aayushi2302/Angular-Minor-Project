import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        MenubarModule,
        TieredMenuModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})
export class SharedModule { }