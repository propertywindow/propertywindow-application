import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/engine/user/user.service';
import {User} from '../../../shared/model/user';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {
    user: User;

    constructor(private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.userService.getUser(currentUser.id)
            .subscribe(result => {
                this.user = result;
            });
    }

}
