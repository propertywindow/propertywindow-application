import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {AgentsComponent} from './agents/agents.component';
import {AddAgentComponent} from './add.agent/add.agent.component';
import {ViewAgentComponent} from './view.agent/view.agent.component';

const routes = [
    {
        path: '',
        component: AgentsComponent
    },
    {
        path: 'add',
        component: AddAgentComponent
    },
    {
        path: 'view/:id',
        component: ViewAgentComponent
    }

];

@NgModule({
    declarations: [
        AgentsComponent,
        AddAgentComponent,
        ViewAgentComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
        RouterModule.forChild(routes)
    ]
})
export class AgentsModule {
}
