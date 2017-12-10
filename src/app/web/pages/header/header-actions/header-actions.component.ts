import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../../shared/services/script-loader.service';

@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: "./header-actions.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class HeaderActionsComponent implements OnInit, AfterViewInit {


	constructor(private script: ScriptLoaderService) {

	}
	ngOnInit() {

	}
	ngAfterViewInit() {
		this.script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
			'assets/app/custom/header/actions.js');

	}

}
