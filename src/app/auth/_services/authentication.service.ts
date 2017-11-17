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
            'id': null,
            'method': 'login',
            'params': {
                'email': email,
                'password': password
            }
        };

		return this.http.post(environment.engineUrl + 'authentication/login', loginData)
			.map((response: Response) => {
				// login successful if there's a jwt token in the response
				let user = response.json();
				console.log(user);
				if (user && user.token) {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem('currentUser', JSON.stringify(user));
				}
			});
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}
}
