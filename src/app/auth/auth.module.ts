import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseRequestOptions, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { AuthRoutingModule } from "./auth-routing.routing";
import { AuthComponent } from "./auth.component";
import { AlertComponent } from "./directives";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "./guards";
import { AuthenticationService, AlertService, UserService, ServiceService, PropertyService } from "./services";
import { fakeBackendProvider } from "./helpers";

@NgModule({
	declarations: [
		AuthComponent,
		AlertComponent,
		LogoutComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		AuthRoutingModule,
	],
	providers: [
		AuthGuard,
		AlertService,
		AuthenticationService,
		UserService,
		ServiceService,
		PropertyService,
		// api backend simulation
		fakeBackendProvider,
		MockBackend,
		BaseRequestOptions,
	],
	entryComponents: [AlertComponent]
})

export class AuthModule {
}
