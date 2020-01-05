import { Organization } from './organization';

export class User {
    id?: string;
    username: string;
    password?: string;
    language?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    timeCreated?: string;
    org: Organization;
}
