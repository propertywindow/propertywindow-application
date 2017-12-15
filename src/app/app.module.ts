import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {WebComponent} from './web/web.component';
import {LayoutModule} from './web/layouts/layout.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScriptLoaderService} from "./shared/services/script-loader.service";
import {WebRoutingModule} from "./web/web-routing.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [
        WebComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        WebRoutingModule,
        SharedModule,
    ],
    providers: [ScriptLoaderService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
