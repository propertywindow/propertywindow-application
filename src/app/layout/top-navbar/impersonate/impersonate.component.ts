import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TopNavbarComponent} from '../top-navbar.component';
import {LeftSidebarComponent} from '../../left-sidebar/left-sidebar.component';

@Component({
    providers: [TopNavbarComponent, LeftSidebarComponent],
    selector: 'topbar-impersonate',
    templateUrl: './impersonate.component.html',
    styleUrls: ['./impersonate.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})

export class ImpersonateComponent implements OnInit {
    impersonate: boolean = false;
    impersonateUser;

    constructor(private router: Router,
                private topNavbar: TopNavbarComponent,
                private leftSidebar: LeftSidebarComponent
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('impersonateUser')) {
            this.impersonate = true;
            this.impersonateUser = JSON.parse(localStorage.getItem('impersonateUser'));
        }
    }

    goBack() {
        localStorage.setItem('currentUser', JSON.stringify({
            id: this.impersonateUser.id,
            email: this.impersonateUser.email,
            token: this.impersonateUser.token
        }));
        localStorage.removeItem('impersonateUser');

        this.impersonate = false;
        this.topNavbar.ngOnInit();
        this.leftSidebar.ngOnInit();

        this.router.navigate(['/users/users']);
    }
}
