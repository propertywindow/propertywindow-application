import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { PagesComponent } from '../pages.component';
import { BlankComponent } from './blank.component';

const routes: Routes = [
	{
		'path': '',
		'component': PagesComponent,
		'children': [
			{
				'path': '',
				'component': BlankComponent,
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
		BlankComponent,
	],
})
export class BlankModule {
}
