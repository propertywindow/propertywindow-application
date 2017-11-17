import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import {environment} from '../../../environments/environment';
import { User } from "../_models/index";

@Injectable()
export class UserService {
	constructor(private http: Http) {
	}

	verify() {
        const data = {
            'jsonrpc': '2.0',
            'method': 'verify',
			'params': {
            	'user_id': 1
			}
        };
		return this.http.post(environment.engineUrl + 'authentication/login', data, this.jwt()).map((response: Response) => response.json());
	}

	forgotPassword(email: string) {
		return this.http.post(environment.engineUrl + 'authentication/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
	}

	getAll() {
		return this.http.get(environment.engineUrl + 'authentication/users', this.jwt()).map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get(environment.engineUrl + 'authentication/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	create(user: User) {
		return this.http.post(environment.engineUrl + 'authentication/users', user, this.jwt()).map((response: Response) => response.json());
	}

	update(user: User) {
		return this.http.put(environment.engineUrl + 'authentication/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete(environment.engineUrl + 'authentication/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	// private helper methods

	private jwt() {
		// create authorization header with jwt token
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser && currentUser.token) {
			let headers = new Headers({ 'Authorization': 'Basic ' + currentUser.token });
			return new RequestOptions({ headers: headers });
		}
	}
}
