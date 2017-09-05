import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../authentication/authentication.service';
import {User} from '../../../model/user';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class UserService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }
    getUsers(): Observable<User[]> {
        let headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});
        let data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getUsers'
        };
        return this.http
            .post('http://propertywindow-engine.dev/authentication/user', data, options)
            .map((response: Response) => response.json().result);
    };

    getUser(id: number): Observable<User> {
        let headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});
        let data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getUser',
            'params': {
                'id': id
            }
        };
        return this.http
            .post('http://propertywindow-engine.dev/authentication/user', data, options)
            .map((response: Response) => response.json().result);
    };
}
