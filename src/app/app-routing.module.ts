import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./shared/logout/logout.component";

const routes: Routes = [
	{ path: 'login', loadChildren: './shared/shared.module#SharedModule' },
	{ path: 'logout', component: LogoutComponent },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
