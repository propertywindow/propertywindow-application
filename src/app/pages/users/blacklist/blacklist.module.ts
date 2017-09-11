import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BlacklistComponent} from './blacklist.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
const BLACKLIST_ROUTE = [{path: '', component: BlacklistComponent}];

@NgModule({
    declarations: [BlacklistComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(BLACKLIST_ROUTE)
    ]
})
export class BlacklistModule {
}
