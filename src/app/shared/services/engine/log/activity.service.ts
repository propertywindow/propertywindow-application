import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Activity} from '../../../model/activity';
import {environment} from '../../../../../environments/environment';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class ActivityService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }
    getActivityFromUser(): Observable<Activity[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getActivityFromUser'
        };
        return this.http
            .post(environment.engineUrl + 'log/activity', data, options)
            .map((response: Response) => response.json().result);
    };

    getPropertyChanges(type: string): Observable<Activity[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getPropertyChanges',
            'params': {
                'type': type
            }
        };
        return this.http
            .post(environment.engineUrl + 'log/activity', data, options)
            .map((response: Response) => response.json().result);
    };
}
