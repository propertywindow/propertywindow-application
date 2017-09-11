import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public id: number;
    public token: string;
    public email: string;
    public name: string;

    constructor(private http: Http) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<boolean> {
        const loginData = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'login',
            'params': {
                'email': email,
                'password': password
            }
        };
        return this.http.post('http://propertywindow-engine.dev/authentication/login', loginData)
            .map((response: Response) => {
                const result = response.json() && response.json().result;
                if (result) {
                    this.id = result[0];
                    this.token = result[1];

                    localStorage.setItem('currentUser', JSON.stringify({
                        id: this.id,
                        email: email,
                        token: this.token
                    }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    impersonate(impersonateId: number): Observable<boolean> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const impersonateData = {
            'jsonrpc': '2.0',
            'id': null,
            'method': 'impersonate',
            'params': {
                'user_id': currentUser.id,
                'impersonate_id': impersonateId
            }
        };
        return this.http.post('http://propertywindow-engine.dev/authentication/login', impersonateData)
            .map((response: Response) => {
                const result = response.json() && response.json().result;
                if (result) {
                    this.id = result[0];
                    this.email = result[1];
                    this.token = result[2];

                    localStorage.setItem('impersonateUser', JSON.stringify({
                        id: currentUser.id,
                        email: currentUser.email,
                        token: currentUser.token
                    }));

                    localStorage.setItem('currentUser', JSON.stringify({
                        id: this.id,
                        email: this.email,
                        token: this.token
                    }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
