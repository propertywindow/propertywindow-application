import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {ServiceGroup} from '../../../model/serviceGroup';
import {Service} from '../../../model/service';
import {environment} from '../../../../../environments/environment';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }
    getServiceGroups(): Observable<ServiceGroup[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getServiceGroups'
        };
        return this.http
            .post(environment.engineUrl + 'services/service_group', data, options)
            .map((response: Response) => response.json().result);
    };

    getServiceGroup(id: number): Observable<ServiceGroup> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getServiceGroup',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'services/service_group', data, options)
            .map((response: Response) => response.json().result);
    };

    getService(id: number): Observable<Service> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getService',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'services/service', data, options)
            .map((response: Response) => response.json().result);
    };

    getMenu(): Observable<ServiceGroup[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getMenu'
        };
        return this.http
            .post(environment.engineUrl + 'services/menu', data, options)
            .map((response: Response) => response.json().result);
    };
}
