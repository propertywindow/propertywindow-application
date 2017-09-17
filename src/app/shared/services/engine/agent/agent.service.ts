import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Agent} from '../../../model/agent';
import {environment} from '../../../../../environments/environment';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AgentService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getAgents(): Observable<Agent[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getAgents'
        };
        return this.http
            .post(environment.engineUrl + 'agent', data, options)
            .map((response: Response) => response.json().result);
    };

    getAgent(id: number): Observable<Agent> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getAgent',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'agent', data, options)
            .map((response: Response) => response.json().result);
    };
}
