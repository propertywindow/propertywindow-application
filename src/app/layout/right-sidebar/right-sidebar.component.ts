import {Component, ViewEncapsulation} from '@angular/core';

import {ConfigService} from '../../shared/services/config/config.service';
import {UserService} from '../../shared/services/engine/user/user.service';
import {ActivityService} from '../../shared/services/engine/log/activity.service';
import {User} from '../../shared/model/user';
import {Activity} from '../../shared/model/activity';

@Component({
    selector: 'app-off-sidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class RightSidebarComponent {
    public DarkScrollbar = {
        axis: 'y',
        theme: 'dark',
        scrollInertia: 0,
        mouseWheel: { preventDefault: true }
    };
    users: User[] = [];
    activities: Activity[] = [];

    constructor(public config: ConfigService,
                private userService: UserService,
                private activityService: ActivityService) {
        this.userService.getColleagues().subscribe(
            data => {
                this.users = data;
            }
        );

        this.activityService.getActivityFromUser().subscribe(
            data => {
                this.activities = data;
            }
        );
    }
}
