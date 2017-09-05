import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppState, InternalStateType} from './app.service';
import {GlobalState} from './app.state';
import {ServicesModule} from './shared/services/services.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app.routing';

// Application wide providers
const APP_PROVIDERS = [AppState, GlobalState, Title];

export type StoreType = {
    state: InternalStateType;
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ServicesModule,
        SharedModule.forRoot(),
        AppRoutingModule
    ],
    providers: [APP_PROVIDERS],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appState: AppState) {
    }
}
