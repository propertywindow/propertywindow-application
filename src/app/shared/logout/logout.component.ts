import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services";
import { Helpers } from "../../helpers";

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

	constructor(private _router: Router,
		private _authService: AuthenticationService) {
	}

	ngOnInit(): void {
		Helpers.setLoading(true);
		// reset login status
		AuthenticationService.logout();
		this._router.navigate(['/login']);
	}
}
