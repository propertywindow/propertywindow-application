import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Blacklist} from '../../../model/blacklist';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class BlacklistService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getBlacklists(): Observable<Blacklist[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getBlacklists'
        };
        return this.http
            .post('http://propertywindow-engine.dev/authentication/blacklist', data, options)
            .map((response: Response) => response.json().result);
    };

    getBlacklist(id: number): Observable<Blacklist> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getBlacklist',
            'params': {
                'id': id
            }
        };
        return this.http
            .post('http://propertywindow-engine.dev/authentication/blacklist', data, options)
            .map((response: Response) => response.json().result);
    };
}
