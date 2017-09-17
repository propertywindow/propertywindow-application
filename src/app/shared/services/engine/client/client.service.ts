import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Client} from '../../../model/client';
import {environment} from '../../../../../environments/environment';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class ClientService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getClients(): Observable<Client[]> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getClients'
        };
        return this.http
            .post(environment.engineUrl + 'contacts/client', data, options)
            .map((response: Response) => response.json().result);
    };

    getClient(id: number): Observable<Client> {
        const headers = new Headers({'Authorization': 'Basic ' + this.authenticationService.token});
        const options = new RequestOptions({headers: headers});
        const data = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'getClient',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'contacts/client', data, options)
            .map((response: Response) => response.json().result);
    };
}
