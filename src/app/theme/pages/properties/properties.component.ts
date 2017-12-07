import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { PropertyService } from '../../../auth/services';
import { Property } from '../../../auth/models/property';


@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: "./properties.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class PropertiesComponent implements OnInit, AfterViewInit {

	properties: Property[] = [];

	constructor(private _script: ScriptLoaderService,
		private propertyService: PropertyService) {

	}

	ngOnInit() {
		this.getProperties();
	}

	ngAfterViewInit() {
		// todo: load with data as parameter instead of json
		// this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
		//     'assets/app/custom/components/datatables/base/data-json.js');
	}

	getProperties() {
		this.propertyService.getProperties().subscribe(
			data => {
				this.properties = data;
			}
		);
	}

}
