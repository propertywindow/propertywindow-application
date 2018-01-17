import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PropertiesComponent} from './properties.component';
import {LayoutModule} from '../../layouts/layout.module';
import {PagesComponent} from '../pages.component';

const routes: Routes = [
    {
        "path": "",
        "component": PagesComponent,
        "children": [
            {
                "path": "",
                "component": PropertiesComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        PropertiesComponent
    ]
})
export class PropertiesModule {


}
