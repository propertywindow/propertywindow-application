import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ViewPropertyComponent} from './view.property.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormWizardModule} from 'angular2-wizard';
const VIEW_PROPERTY_ROUTE = [{path: '', component: ViewPropertyComponent}];

@NgModule({
    declarations: [ViewPropertyComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormWizardModule,
        RouterModule.forChild(VIEW_PROPERTY_ROUTE)
    ]
})
export class ViewPropertyModule {
}
