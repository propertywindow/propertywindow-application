import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddPropertyComponent} from './add.property.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormWizardModule} from 'angular2-wizard';
const ADD_PROPERTY_ROUTE = [{path: '', component: AddPropertyComponent}];

@NgModule({
    declarations: [AddPropertyComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormWizardModule,
        RouterModule.forChild(ADD_PROPERTY_ROUTE)
    ]
})
export class AddPropertyModule {
}
