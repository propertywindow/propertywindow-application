import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentService} from '../../../shared/services/engine/agent/agent.service';
import {Agent} from '../../../shared/model/agent';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './add.agent.component.html',
    styleUrls: ['./add.agent.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AddAgentComponent implements OnInit {

    agent: Agent;
    loading = true;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private route: ActivatedRoute,
                private router: Router,
                private agentService: AgentService) {
    }

    ngOnInit() {
    }

}
