import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Helpers} from '../../../helpers';
import {UserService} from '../../../auth/_services/user.service';
import {User} from '../../../auth/_models/user';


declare let mLayout: any;

@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

    user: User;

    constructor(private _userService: UserService,) {

    }

    ngOnInit() {
        this.getUser();
    }

    ngAfterViewInit() {

        mLayout.initHeader();


    }

    getUser() {
        this._userService.getUser()
            .subscribe(
                data => {
                    this.user = data;
                },
                error => {
                    console.log(error);
                });
    }

}
