import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Activity} from '../../../model/activity';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class ActivityService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }
    getActivityFromUser(): Observable<Activity[]> {
        let headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});
        let data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getActivityFromUser'
        };
        return this.http
            .post('http://propertywindow-engine.dev/log/activity', data, options)
            .map((response: Response) => response.json().result);
    };
}
