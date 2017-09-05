import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PropertiesComponent} from './properties.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
const PROPERTIES_ROUTE = [{path: '', component: PropertiesComponent}];

@NgModule({
    declarations: [PropertiesComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(PROPERTIES_ROUTE)
    ]
})
export class PropertiesModule {
}
