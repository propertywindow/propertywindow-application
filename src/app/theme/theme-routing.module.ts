import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
	{
		"path": "",
		"component": ThemeComponent,
		"canActivate": [AuthGuard],
		"children": [
			{
				"path": "index",
				"loadChildren": ".\/pages\/default\/index\/index.module#IndexModule"
			},
			{
				"path": "header\/actions",
				"loadChildren": ".\/pages\/default\/header\/header-actions\/header-actions.module#HeaderActionsModule"
			},
			{
				"path": "header\/profile",
				"loadChildren": ".\/pages\/default\/header\/header-profile\/header-profile.module#HeaderProfileModule"
			},
			{
				"path": "404",
				"loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
			},
			{
				"path": "",
				"redirectTo": "index",
				"pathMatch": "full"
			}
		]
	},
	{
		"path": "snippets\/pages\/user\/login-1",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-1\/user-login-1.module#UserLogin1Module"
	},
	{
		"path": "snippets\/pages\/errors\/error-1",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-1\/errors-error-1.module#ErrorsError1Module"
	},
	{
		"path": "snippets\/pages\/errors\/error-2",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-2\/errors-error-2.module#ErrorsError2Module"
	},
	{
		"path": "snippets\/pages\/errors\/error-3",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-3\/errors-error-3.module#ErrorsError3Module"
	},
	{
		"path": "snippets\/pages\/errors\/error-4",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-4\/errors-error-4.module#ErrorsError4Module"
	},
	{
		"path": "snippets\/pages\/errors\/error-5",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-5\/errors-error-5.module#ErrorsError5Module"
	},
	{
		"path": "snippets\/pages\/errors\/error-6",
		"loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-6\/errors-error-6.module#ErrorsError6Module"
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
export class ThemeRoutingModule { }
