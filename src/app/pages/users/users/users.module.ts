import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
const USERS_ROUTE = [{path: '', component: UsersComponent}];

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(USERS_ROUTE)
    ]
})
export class UsersModule {
}
