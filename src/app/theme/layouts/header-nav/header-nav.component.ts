import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {UserService} from '../../../auth/services';
import {User} from '../../../auth/models';


declare let mLayout: any;

@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

    user: User;

    constructor(private userService: UserService,) {

    }

    ngOnInit() {
        this.getUser();
    }

    ngAfterViewInit() {
        mLayout.initHeader();
    }

    getUser() {
        this.userService.getUser()
            .subscribe(
                data => {
                    this.user = data;
                },
                error => {
                    console.log(error);
                });
    }
}
