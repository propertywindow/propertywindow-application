import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {environment} from '../../../environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {

	constructor(private http: Http) {
	}

	login(email: string, password: string) {
        const loginData = {
            'jsonrpc': '2.0',
            'method': 'login',
            'params': {
                'email': email,
                'password': password
            }
        };

		return this.http.post(environment.engineUrl + 'authentication/login', loginData)
			.map((response: Response) => {
				let user = response.json().result;
				if (user && user.token) {
					localStorage.setItem('currentUser', JSON.stringify(user));
				}
				return response.json().result;
			});
	}

	static logout() {
		localStorage.removeItem('currentUser');
	}
}
