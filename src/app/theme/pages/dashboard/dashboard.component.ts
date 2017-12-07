import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../shared/services/script-loader.service';

@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: "./dashboard.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit {


	constructor(private _script: ScriptLoaderService) {

	}
	ngOnInit() {

	}
	ngAfterViewInit() {
		this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
			'assets/app/js/dashboard.js');

	}

}
