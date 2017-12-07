import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../shared/services/script-loader.service';
import { PropertyService } from '../../../shared/services';
import { Property } from '../../../shared/models/property';

@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: "./properties.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class PropertiesComponent implements OnInit, AfterViewInit {

	properties: Property[] = [];

	constructor(private script: ScriptLoaderService,
		private propertyService: PropertyService) {

	}

	ngOnInit() {
		this.getProperties();
	}

	ngAfterViewInit() {
		this.script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        'assets/app/custom/components/datatables/base/html-table.js');
	}

	getProperties() {
		this.propertyService.getProperties().subscribe(
			data => {
				this.properties = data;
			}
		);
	}

}
