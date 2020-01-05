import {Organization} from './organization';

export class Brand {
    id: string;
    name: string;
    logoFileName: string;
    logo: Blob;
    org: Organization;
}
