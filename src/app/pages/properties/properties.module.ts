import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormWizardModule} from 'angular2-wizard';

import {PropertiesComponent} from './properties/properties.component';
import {AddPropertyComponent} from './add.property/add.property.component';
import {ViewPropertyComponent} from './view.property/view.property.component';

const routes = [
    {
        path: '',
        component: PropertiesComponent
    },
    {
        path: 'add',
        component: AddPropertyComponent
    },
    {
        path: 'view/:id',
        component: ViewPropertyComponent
    }

];

@NgModule({
    declarations: [
        PropertiesComponent,
        AddPropertyComponent,
        ViewPropertyComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        FormWizardModule,
        RouterModule.forChild(routes)
    ]
})
export class PropertiesModule {
}
