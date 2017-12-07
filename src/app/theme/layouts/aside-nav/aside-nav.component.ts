import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ServiceService } from "../../../auth/_services/service.service";
import { ServiceGroup } from '../../../auth/_models/service-group';

declare let mLayout: any;
@Component({
	selector: "app-aside-nav",
	templateUrl: "./aside-nav.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

	service: ServiceGroup[] = [];

	constructor(private serviceService: ServiceService) {

	}

	ngOnInit() {
		this.getMenu();
	}

	ngAfterViewInit() {
		mLayout.initAside();
		let menu = mLayout.getAsideMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
	}

	getMenu() {
		this.serviceService.getMenu().subscribe(
			data => {
				this.service = data;
			}
		);
	}
}
