import {NgModule} from '@angular/core';
import {WebComponent} from './web.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../shared/guards";

const routes: Routes = [
    {
        "path": "",
        "component": WebComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "dashboard",
                "loadChildren": ".\/pages\/dashboard\/dashboard.module#DashboardModule"
            },
            {
                "path": "header\/actions",
                "loadChildren": ".\/pages\/header\/header-actions\/header-actions.module#HeaderActionsModule"
            },
            {
                "path": "header\/profile",
                "loadChildren": ".\/pages\/header\/header-profile\/header-profile.module#HeaderProfileModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "properties",
                "loadChildren": ".\/pages\/properties\/properties.module#PropertiesModule"
            },
            {
                "path": "",
                "redirectTo": "dashboard",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule {
}
