import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TopNavbarComponent} from '../top-navbar.component';
import {LeftSidebarComponent} from '../../left-sidebar/left-sidebar.component';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import {AuthenticationService} from '../../../shared/authentication/authentication.service';

@Component({
    selector: 'topbar-impersonate',
    templateUrl: './impersonate.component.html',
    styleUrls: ['./impersonate.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})

export class ImpersonateComponent implements OnInit {
    public static updateUser: Subject<boolean> = new Subject();
    impersonate: boolean = false;
    impersonateUser;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        ImpersonateComponent.updateUser.subscribe(res => {
            this.impersonate = false;
            if (localStorage.getItem('impersonateUser')) {
                this.impersonate = true;
                this.impersonateUser = JSON.parse(localStorage.getItem('impersonateUser'));
            }
        })
    }

    ngOnInit() {
        ImpersonateComponent.updateUser.next(true);
    }

    goBack() {
        swal({
            title: 'Going Back',
            text: 'One moment please..',
            type: 'success',
            timer: 4000,
            customClass: 'animated tada',
            showConfirmButton: false,
        }).then(
            function () {},
            function (dismiss) {}
        );
        this.authenticationService.reImpersonate()
            .subscribe(result => {
                if (result === true) {
                    TopNavbarComponent.updateUser.next(true);
                    LeftSidebarComponent.updateUser.next(true);
                    ImpersonateComponent.updateUser.next(true);
                    this.router.navigate(['/users/users']);
                } else {
                    swal({
                        title: 'Error!',
                        text: 'Something went wrong.',
                        type: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    });
                }
            });
    }
}
