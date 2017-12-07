import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { PagesComponent } from '../pages.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
	{
		'path': '',
		'component': PagesComponent,
		'children': [
			{
				'path': '',
				'component': NotFoundComponent,
			},
		],
	},
];

@NgModule({
	imports: [
		CommonModule, RouterModule.forChild(routes), LayoutModule,
	], exports: [
		RouterModule,
	], declarations: [
		NotFoundComponent,
	],
})
export class NotFoundModule {
}
