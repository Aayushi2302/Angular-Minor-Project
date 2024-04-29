import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
    declarations: [
        HeaderComponent,
        PageNotFoundComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MenubarModule,
        TieredMenuModule,
        ProgressSpinnerModule
    ],
    exports: [
        HeaderComponent,
        PageNotFoundComponent,
        LoaderComponent
    ]
})
export class SharedModule { }