import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {AddUserComponent} from './add.user/add.user.component';
import {ViewUserComponent} from './view.user/view.user.component';
import {BlacklistComponent} from './blacklist/blacklist.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

const routes = [
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'users/add',
        component: AddUserComponent
    },
    {
        path: 'users/view/:id',
        component: ViewUserComponent
    },
    {
        path: 'blacklist',
        component: BlacklistComponent
    }
];

@NgModule({
    declarations: [
        UsersComponent,
        AddUserComponent,
        ViewUserComponent,
        BlacklistComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule {
}
