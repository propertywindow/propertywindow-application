import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../shared/services/script-loader.service';
import { PropertyService } from '../../../shared/services';
import { Property } from '../../../shared/models/property';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: "./properties.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class PropertiesComponent implements OnInit {

	properties: Property[] = [];
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();

	constructor(private script: ScriptLoaderService,
		private propertyService: PropertyService) {

	}

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 2
		};
		this.getProperties();
	}

	getProperties() {
		this.propertyService.getProperties().subscribe(
			data => {
				this.properties = data;
				this.dtTrigger.next();
			}
		);
	}


}
