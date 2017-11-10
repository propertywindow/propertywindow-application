import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthGuard} from '../shared/guards/auth.guard';

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
                loadChildren: '../pages/dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            },
            // ---------------------------------------------------------->
            // Properties
            // ---------------------------------------------------------->
            {
                path: 'properties',
                loadChildren: '../pages/properties/properties.module#PropertiesModule',
                canActivate: [AuthGuard]
            },
            // ---------------------------------------------------------->
            // Users
            // ---------------------------------------------------------->
            {
                path: 'users',
                loadChildren: '../pages/users/users.module#UsersModule',
                canActivate: [AuthGuard]
            },
            // ---------------------------------------------------------->
            // Agents
            // ---------------------------------------------------------->
            {
                path: 'agents',
                loadChildren: '../pages/agents/agents.module#AgentsModule',
                canActivate: [AuthGuard]
            },
            // ---------------------------------------------------------->
            // Contacts
            // ---------------------------------------------------------->
            {
                path: 'contacts/clients',
                loadChildren: '../pages/contacts/clients/clients.module#ClientsModule',
                canActivate: [AuthGuard]
            }
        ]
    },

    // 404 Page Not Found
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
