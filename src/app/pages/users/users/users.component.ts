import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate,
    ElementRef,
    HostListener,
    HostBinding
} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {UserService} from '../../../shared/services/engine/user/user.service';
import {User} from '../../../shared/model/user';
import {Service} from '../../../shared/model/service';
import {ServiceService} from '../../../shared/services/engine/service/service.service';
import {AuthenticationService} from '../../../shared/authentication/authentication.service';
import {TopNavbarComponent} from '../../../layout/top-navbar/top-navbar.component';
import {LeftSidebarComponent} from '../../../layout/left-sidebar/left-sidebar.component';
import {ImpersonateComponent} from '../../../layout/top-navbar/impersonate/impersonate.component';
import swal from 'sweetalert2';

@Component({
    providers: [TopNavbarComponent, LeftSidebarComponent, ImpersonateComponent],
    selector: '.content_inner_wrapper',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    service: Service;
    rows: User[] = [];
    selected = [];
    temp = [];
    searchValue: string = null;
    isSearchActive: boolean = false;
    isToolbarActive: boolean = false;
    itemsSelected: string = '';
    itemCount: number = 0;

    constructor(private router: Router,
                private userService: UserService,
                private serviceService: ServiceService,
                private authenticationService: AuthenticationService,
                private topNavbar: TopNavbarComponent,
                private leftSidebar: LeftSidebarComponent,
                private impersonateBar: ImpersonateComponent) {
    }

    ngOnInit() {
        this.serviceService.getService(8)
            .subscribe(data => {
                this.service = data;
            });
        this.userService.getUsers()
            .subscribe(data => {
                this.temp = [...data];
                this.rows = data;
            });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.address.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
    }

    onSelect({selected}) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        if (selected.length === 1) {
            this.isToolbarActive = true;
            this.itemCount = selected.length;
            this.itemsSelected = 'Item Selected';
        } else if (selected.length > 0) {
            this.isToolbarActive = true;
            this.itemCount = selected.length;
            this.itemsSelected = 'Items Selected';
        } else {
            this.isToolbarActive = false;
        }
    }

    triggerClose(event) {
        this.rows = this.temp;
        this.searchValue = '';
        this.isSearchActive = !this.isSearchActive;
    }

    onActivate(event) {
        // console.log('Activate Event', event);
    }

    add() {
        this.selected.push(this.rows[1], this.rows[3]);
    }

    update() {
        this.selected = [this.rows[1], this.rows[3]];
    }

    remove() {
        this.selected = [];
    }

    impersonate(id) {
        // todo : add popup to confirm

        this.authenticationService.impersonate(id)
            .subscribe(result => {
                if (result === true) {
                    this.topNavbar.ngOnInit();
                    this.leftSidebar.ngOnInit();
                    this.impersonateBar.ngOnInit();
                    this.router.navigate(['/']);
                    swal('Success', 'You are now impersonating', 'success');
                } else {

                    // todo: add loading
                }
            });
    }
}
