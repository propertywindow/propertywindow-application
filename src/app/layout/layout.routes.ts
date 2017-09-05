import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const LAYOUT_ROUTES: Routes = [
    {
        path: 'lock',
        loadChildren: '../pages/authentication/lock/lock.module#LockModule'
    },
    {
        path: 'login',
        loadChildren: '../pages/authentication/login/login.module#LoginModule'
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            // ---------------------------------------------------------->
            // Dashboards
            // ---------------------------------------------------------->
            {
                path: 'dashboard',
                loadChildren: '../pages/dashboard/dashboard.module#DashboardModule'
            },
            // ---------------------------------------------------------->
            // Properties
            // ---------------------------------------------------------->
            {
                path: 'properties',
                loadChildren: '../pages/properties/properties/properties.module#PropertiesModule'
            },
            // ---------------------------------------------------------->
            // Users
            // ---------------------------------------------------------->
            {
                path: 'users/users',
                loadChildren: '../pages/users/users/users.module#UsersModule'
            }
        ]
    },

    // 404 Page Not Found
    {path: '**', redirectTo: 'dashboards'}
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
