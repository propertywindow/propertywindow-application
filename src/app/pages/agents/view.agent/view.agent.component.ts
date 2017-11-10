import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AgentService} from '../../../shared/services/engine/agent/agent.service';
import {Agent} from '../../../shared/model/agent';
import {UserService} from '../../../shared/services/engine/user/user.service';
import {User} from '../../../shared/model/user';
import {ActivityService} from '../../../shared/services/engine/log/activity.service';
import {Property} from '../../../shared/model/property';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './view.agent.component.html',
    styleUrls: ['./view.agent.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ViewAgentComponent implements OnInit {

    agent: Agent;
    users: User[] = [];
    newProperties: Property[] = [];
    loading = true;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private agentService: AgentService,
                private activityService: ActivityService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.agentService.getAgent(+params['id']))
            .subscribe((agent) => {
                    this.loading = false;
                    this.agent = agent;
                    this.userService.getAgentUsers(agent.id)
                        .subscribe(users => {
                            this.users = users;
                        });
                    this.activityService.getPropertyChanges('create', agent.id).subscribe(
                        data => {
                            const property: Property[] = [];
                            for (const entry of data) {
                                property.push(JSON.parse(entry.new_value));
                            }
                            this.newProperties = property;
                        }
                    );
                }
            );
    }

}
