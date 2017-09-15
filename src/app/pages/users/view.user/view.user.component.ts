import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../shared/services/engine/user/user.service';
import {User} from '../../../shared/model/user';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './view.user.component.html',
    styleUrls: ['./view.user.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ViewUserComponent implements OnInit {

    user: User;
    loading = true;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(+params['id']))
            .subscribe((data) => {
                    this.loading = false;
                    this.user = data;
                }
            );
    }

}