import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {AgmCoreModule} from '@agm/core';

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
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDtLM4g3dzZ-frhoSJM3k9GY9I8Df6RmXU'
        }),
        RouterModule.forChild(DASHBOARD_ROUTE)
    ]

})
export class DashboardModule {
}
