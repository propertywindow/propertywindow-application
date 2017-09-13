import {Agent} from './agent';
import {UserType} from './userType';
export class User {
    id: number;
    email: string;
    password: string;
    full_name: string;
    first_name: string;
    last_name: string;
    address: string;
    street: string;
    house_number: string;
    postcode: string;
    city: string;
    country: string;
    phone: string;
    agent_id: number;
    agent: Agent;
    user_type_id: number;
    user_type: UserType;
    avatar: string;
    active: boolean;
    last_login: string;
    last_online: string;
    first_login: boolean;
    online_now: boolean;
}
