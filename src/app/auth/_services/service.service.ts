import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Service} from '../_models/service';
import {ServiceGroup} from '../_models/service-group';
import {environment} from '../../../environments/environment';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceService {
    constructor(private http: Http) {
    }

    getServiceGroups(): Observable<ServiceGroup[]> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getServiceGroups'
        };
        return this.http
            .post(environment.engineUrl + 'services/service_group', data, this.jwt())
            .map((response: Response) => response.json().result);
    };

    getServiceGroup(id: number): Observable<ServiceGroup> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getUser',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'services/service_group', data, this.jwt())
            .map((response: Response) => response.json().result);
    };

    getService(id: number): Observable<Service> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getService',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'services/service', data, this.jwt())
            .map((response: Response) => response.json().result);
    };

    getMenu(): Observable<ServiceGroup[]> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getMenu'
        };
        return this.http
            .post(environment.engineUrl + 'services/menu', data, this.jwt())
            .map((response: Response) => response.json().result);
    };

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Basic ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }
}
