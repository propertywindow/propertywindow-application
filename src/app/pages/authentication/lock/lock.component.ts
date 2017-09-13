import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/authentication/authentication.service';
import {UserService} from '../../../shared/services/engine/user/user.service';
import {User} from '../../../shared/model/user';


@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    user: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.userService.getUser(currentUser.id)
            .subscribe(result => {
                this.user = result;
            });
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Incorrect login details';
                    this.loading = false;
                }
            });
    }

}
