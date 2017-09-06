import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Property} from '../../../model/property';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class PropertyService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getProperties(): Observable<Property[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getProperties'
        };

        return this.http
            .post('http://propertywindow-engine.dev/property', data, options)
            .map((response: Response) => response.json().result);
    };

    getProperty(id: number): Observable<Property> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getProperty',
            'params': {
                'id': id
            }
        };

        return this.http
            .post('http://propertywindow-engine.dev/property', data, options)
            .map((response: Response) => response.json().result);
    };
}
