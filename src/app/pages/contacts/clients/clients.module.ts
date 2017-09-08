import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClientsComponent} from './clients.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
const CLIENTS_ROUTE = [{path: '', component: ClientsComponent}];

@NgModule({
    declarations: [ClientsComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(CLIENTS_ROUTE)
    ]
})
export class ClientsModule {
}
