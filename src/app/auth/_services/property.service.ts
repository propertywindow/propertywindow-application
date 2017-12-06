import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Property} from '../_models/property';
import {environment} from '../../../environments/environment';

@Injectable()
export class PropertyService {
    constructor(private http: Http) {
    }

    getProperties(): Observable<Property[]> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getProperties'
        };
        return this.http
            .post(environment.engineUrl + 'property', data, this.jwt())
            .map((response: Response) => response.json().result);
    };

    getProperty(id: number): Observable<Property> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getProperty',
            'params': {
                'id': id
            }
        };
        return this.http
            .post(environment.engineUrl + 'property', data, this.jwt())
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
