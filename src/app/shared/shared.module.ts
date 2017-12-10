import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AuthRoutingModule} from "./auth-routing.routing";
import {AuthComponent} from "./auth.component";
import {AlertComponent} from "./alert/alert.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGuard} from "./guards";
import {
    AuthenticationService,
    AlertService,
    UserService,
    ServiceService,
    PropertyService,
    ChatService
} from "./services";

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
        ChatService,
    ],
    entryComponents: [AlertComponent]
})

export class SharedModule {
}
