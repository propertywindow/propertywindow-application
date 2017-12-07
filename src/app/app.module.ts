import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./shared/services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
	declarations: [
		ThemeComponent,
		AppComponent,
	],
	imports: [
		LayoutModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ThemeRoutingModule,
        SharedModule,
	],
	providers: [ScriptLoaderService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
