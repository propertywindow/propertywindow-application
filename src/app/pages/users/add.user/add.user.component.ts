import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/engine/user/user.service';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './add.user.component.html',
    styleUrls: ['./add.user.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AddUserComponent implements OnInit {
    loading = true;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
    }
}
