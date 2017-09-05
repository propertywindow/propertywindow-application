import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';


const DASHBOARD_ROUTE = [
    {path: '', component: DashboardComponent},
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(DASHBOARD_ROUTE)
    ]

})
export class DashboardModule {
}
