import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AgentsComponent} from './agents.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
const AGENTS_ROUTE = [{path: '', component: AgentsComponent}];

@NgModule({
    declarations: [AgentsComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(AGENTS_ROUTE)
    ]
})
export class AgentsModule {
}
