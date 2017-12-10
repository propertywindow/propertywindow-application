import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../shared/services/script-loader.service';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
	selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
	templateUrl: "./web.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class WebComponent implements OnInit {

	constructor(private script: ScriptLoaderService, private router: Router) {

	}

	ngOnInit() {
		this.script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/app/base/scripts.bundle.js')
			.then(result => {
				Helpers.setLoading(false);
				// optional js to be loaded once
				this.script.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
			});
		this.router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				(<any>mLayout).closeMobileAsideMenuOffcanvas();
				(<any>mLayout).closeMobileHorMenuOffcanvas();
				(<any>mApp).scrollTop();
				Helpers.setLoading(true);
				// hide visible popover
				(<any>$('[data-toggle="m-popover"]')).popover('hide');
			}
			if (route instanceof NavigationEnd) {
				// init required js
				(<any>mApp).init();
				(<any>mUtil).init();
				Helpers.setLoading(false);
				// content m-wrapper animation
				let animation = 'm-animate-fade-in-up';
				$('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
					$('.m-wrapper').removeClass(animation);
				}).removeClass(animation).addClass(animation);
			}
		});
	}

}
